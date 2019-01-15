<?php
use Workerman\Worker;
require_once '/home/Workerman/Autoloader.php';
require_once 'vendor/autoload.php';
//init a worker ,listen 1234
//外部接口

Worker::$stdoutFile = '/home/stdout.log';

$worker = new Worker('tcp://0.0.0.0:1234');

$worker->count = 1;

global $db;
$db = new Workerman\MySQL\Connection('localhost','3306','root','wanyangwenhua','WY');
// create an inner transformer

$worker->onWorkerStart = function($worker)
{
	//open an inner port
	//内部接口
	$inner_worker = new Worker('tcp://0.0.0.0:5678');
	$inner_worker->onMessage = function($connection,$buffer)
	{       
		echo $buffer;
		global $worker;
		//$data arrat,store uid 
		$data = json_decode($buffer,true);
		$uid = $data['uid'];
		$msg = $data['msg'];
		//use workerman to push data to zhe page of uid
		$ret = sendMessageByUid($uid,$msg);
		//return result
		$connection->send($ret?'ok':'fail');
		
	};
	$inner_worker->listen();
};
// new a character to store uid reference to connection
$worker->uidConnections = array();
//when client send message excute callback function

$worker->onMessage = function($connection,$data)use($worker)
{

	//judge the current client's uid
	if(!isset($connection->uid))
	{
		//if not user the first bag as uid
		$connection->uid = $data;
	/*store uid to connection 
	 *realize the function to push data to special uid page
	 */
	$worker->uidConnections[$connection->uid] = $connection;

	}
	//如果是心跳指令，返回心跳指令
	//$connection->send('ok,I accept it...');
		
	
	
	if((substr($data,0,2)=='6A')&&(substr($data,-2)=='EE')){
		
		if(substr($data,0,4) == '6A04') {$connection->send($data);
						
		}
		
		
		echo $data;
		handleOrder($data,$connection->uid);
		
	}
};
//when client break the link
$worker->onClose = function($connection)use($worker)
{
	global $worker;
	if(isset($connection->uid))
	{
		//delete reference
		unset($worker->uidConnections[$connection->uid]);
	}
};
/*
$worker->onConnect = function($connection)use($worker)
{
	global $worker;
	if($connection->getRemoteIp()=='127.0.0.1')
	{
		$worker->uidConnections['master'] = $connection;
	}
};
*/
//

function sendMessageByUid($uid,$message)
{
	global $worker;
	if(isset($worker->uidConnections[$uid]))
	{
		$connection = $worker->uidConnections[$uid];
		$connection->send($message);
		return true;
	}
	return false;
}
//借书函数

function lendBook($uid,$bookid)
{
	global $db;
	$sqli = "select bookid from book where bookid = '{$bookid}';";
	$row_count = $db->query($sqli);
	$book_id = intval($row_count["bookid"]);
	$sqld="delete from book_box where bookid='{$bookid}';";
	$row_count = $db->query($sqld);
	//删除存货book
	$sql="insert into lend_record(uid,bookid,lend_date) values ('{$uid}','{$bookid}',unix_timestamp(now()))";
	$row_count = $db->query($sql);

	if($row_count){
		$sqlii = "update book set lend_count = lend_count + 1 where bookid = '{$book_id}';";
		$row_counts = $db->query($sqlii);
		
	}
}

//还书函数
function returnBook($uid,$bookid,$boxsid,$Gid)
{
	global $db;
	$sqli = "select bookid from book where bookid = '{$bookid}';";
	$row_count = $db->query($sqli);
	$book_id = intval($row_count["bookid"]);
	$sql = "update lend_record set return_date = unix_timestamp(now()) where uid = '{$uid}' and bookid = '{$bookid}';";
	$row_count = $db->query($sql);
	$sqlbox= "insert into book_box(boxid,cpdid,bookid) values('{$boxsid}','{$Gid}','{$bookid}')";
	$rowbox= $db->query($sqlbox);
	//书籍类别
	$sqlbooktype="select type from book WHERE book_id='{$bookid}'";
	$row_book= $db->query($sqlbooktype);
	$booktype= $row_book['type'];
	$bookmoney=0;
	switch ($booktype){
		case "漫画绘本":$bookmoney=1;break;
		case "杂志": $bookmoney=2;break;
		case "畅销书": $bookmoney=3;break;
		case "系列小说": $bookmoney=4;break;
	}
	//计算时间
	$sqltime="select * from lend_record WHERE uid='{$uid}' AND bookid='{$bookid}'";
	$row_time= $db->query($sqltime);
	$lendtime= intval($row_time['lend_date']);
	$returntime= intval($row_time['return_date']);
	$day= ceil(($returntime- $lendtime)/86400);
	//用户类别
	$sqlusertype="select usertype from user_info WHERE telephone='{$uid}'";
	$row_user= $db->query($sqlusertype);
	$usertype= intval($row_user['usertype']);
	//判断pay值
	$pay= 0;
	if($usertype==4 || $usertype== 3){
		$pay=0;
	}else if($usertype== 2 || $usertype== 1){
		if($bookmoney== 2){
			$pay=0;
		}else{
			$pay=$bookmoney*$day;
		}
	}else{
		$pay= $bookmoney*$day;
	}
	//设置pay值
	$sqlmoney= "update lend_record set pay='{$pay}' WHERE uid='{$uid}' AND bookid='{$bookid}'";
	$row_money= $db->query($sqlmoney);
	//扣钱
	$sqlrem="update account set balance=balance-'{$pay}' WHERE uid='{$uid}'";
	$rowrem= $db->query($sqlrem);

}

//判断是借书还是还书
function judgeRorL($uid,$bookid){
	global $db;
	$sql = "select * from lend_record where uid = '{$uid}' and bookid = '{$bookid}';";
	$row_count = $db->query($sql);
	if($row_count){
		foreach($row_count as $key=>$link){
			if(empty($link['return_date'])&&!empty($link['lend_date'])) return true;//如果存在借书未还，则返回true
			else return false;//否则返回false，为借书操作
		}
	}
	else return false;
}

//指令处理函数
function handleOrder($order,$boxid)
{
	global $db;
	$boxsid = intval($boxid);
	$uid = substr($order,-13,11);//用户编号
	$Gid = intval(substr($order,2,2));//柜门编号
	$sqli = "update book_box set cpdstate = 1 where boxid = {$boxsid} and cpdid = {$Gid};";
	$row_res = $db->query($sqli);
	$sql = "select cpdstate from book_box where boxid = {$boxsid} and cpdid = {$Gid};";
	$row_count = $db->query($sql);
	$cpdstate = intval($row_count["cpdstate"]);
	if($cpdstate==0){
	$booknumber = intval(substr($order,4,2));//书出入数量
	$book = array();
	if($booknumber>0){
	for($i=0;$i<$booknumber;$i++){
		$book[$i] = substr($order,6+16*$i,16);//单本书RFID
		if(judgeRorL($uid,$book[$i])) returnBook($uid,$book[$i],$boxsid,$Gid);
		else lendBook($uid,$book[$i]);
	}
}
	}


}
Worker::runAll();
?>
