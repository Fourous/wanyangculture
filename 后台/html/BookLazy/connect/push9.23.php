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


//查询为差值，证明门已关
	if((substr($data,0,2)=='6A')&&(substr($data,-2)=='EE')){
		//心跳指令，门还没关
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
//借也要知道从哪个柜子借的，不然无法进行删除
function lendBook($uid,$bookid)
{
	global $db;
	$sqli = "select bookid from book where bookid = '{$bookid}';";
	$row_count = $db->query($sqli);
	$book_id = intval($row_count["bookid"]);
/*	$sql = "insert into lend_record set uid = '{$uid}',bookid = {$book_id},lend_date = unix_timestamp(now());";
*/

	$sql="insert into lend_record(uid,bookid,lend_date) values ('{$uid}','{$bookid}',unix_timestamp(now()))";
	$row_count = $db->query($sql);
	$sqlbox="delete from book_box where bookid='{$bookid}';";
	$rowbox= $db->query($sqlbox);
	if($row_count){
		$sqlii = "update book set lend_count = lend_count + 1 where bookid = '{$book_id}';";
		$row_counts = $db->query($sqlii);
	}
}

//还书函数
//uid用户，bookid书，boxsid箱子，Gid柜子
function returnBook($uid,$bookid,$boxsid,$Gid)
{
	global $db;
	$sqli = "select bookid from book where bookid = '{$bookid}';";
	$row_count = $db->query($sqli);
	$book_id = intval($row_count["bookid"]);
	$sql = "update lend_record set return_date = unix_timestamp(now()) where uid = '{$uid}' and bookid = '{$book_id}';";
	$row_count = $db->query($sql);
	$sqlbox= "insert into book_box(boxid,cpdid,bookid) values ('{$boxsid}','{$Gid}','{$bookid}')";
	$rowbox= $db->query($sqlbox);

}

//判断是借书还是还书
function judgeRorL($uid,$bookid){
	global $db;
	//查询uid和bookid,有这个记录的证明曾经接过
	$sql = "select * from lend_record where uid = '{$uid}' and bookid = '{$bookid}';";
	$row_count = $db->query($sql);
	if($row_count){
		//通过returndata判别
		foreach($row_count as $key=>$link){
			if(empty($link['return_date'])&&!empty($link['lend_date'])) return true;//如果存在借书未还，则返回true，这是还书
			else return false;//否则返回false，为借书操作
		}
	}
	//没有查到记录，也就是没有uid的lend_data这个记录，可以是还书或者刚开始录的书
	else return true;//增加书的操作，可以说还书，但是没有lend_data这个是首次添加书的时候，自动插入表
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
	$booknumber = intval(substr($order,4,2));//书出入数量,的变动数量
	//判别借书还是还书应该是通过还书日期定
	$book = array();
	if($booknumber>0){
	for($i=0;$i<$booknumber;$i++){
		$book[$i] = substr($order,6+16*$i,16);//单本书RFID
		if(judgeRorL($uid,$book[$i])){
				returnBook($uid,$book[$i],$boxsid,$Gid);
		}
		else {
		lendBook($uid,$book[$i]);
		}
	}
}
	}


}
Worker::runAll();
?>
