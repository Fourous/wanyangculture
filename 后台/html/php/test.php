<?php

include ('mysqli_connect.php');
/*
$sql = "select * from lend_record";

$rs = mysqli_query($dbc,$sql);

if($rs){ 
$res = mysqli_fetch_array($rs,MYSQLI_ASSOC);
var_dump($res);
echo "<br />";
$stime = intval($res["lend_date"]);
var_dump($stime);
echo "<br />";
var_dump($res["lend_date"]);
echo "<br />";
$sqltime = "select from_unixtime({$stime});";
$rstime = mysqli_query($dbc,$sqltime);
$restime = mysqli_fetch_array($rstime);
var_dump($restime[0]);
}
//var_dump($date);
*/

		$sql="select * from lend_record where uid = '123456';";
		$query_res=mysqli_query($dbc,$sql);
		if($query_res){
		while($resc1 = mysqli_fetch_array($query_res,MYSQLI_ASSOC)) $result[] = $resc1;
		
		echo json_encode($result);
		
		echo "<br />";
		}
		
	var_dump($result);






mysqli_close($dbc);

//include ('mysqli_connect.php');




/*
		$sql="select * from user_info where telephone = '13247213178';";
		$query_res=mysqli_query($dbc,$sql);
		if($query_res){
		$resc1 = mysqli_fetch_array($query_res,MYSQLI_ASSOC);
		echo json_encode($resc1);
		
		echo "<br />";
		
		var_dump($resc1);
		}
		

		$sql="select * from book order by lend_count desc limit 2;";
		$query_res=mysqli_query($dbc,$sql);
		if($query_res){
		while($resc1 = mysqli_fetch_array($query_res,MYSQLI_ASSOC)) $result[] = $resc1;
		echo json_encode($result);
		echo "<br />";
		var_dump($result);
		}
	

$sql = "select user_info.telephone,user_info.nickname,user_info.picture,book_comment.comment,book_comment.uid,book_comment.commentid from user_info join book_comment on telephone = uid where bookid = 1234;";
	$res = mysqli_query($dbc,$sql);
	if($res){
		while($bookcomment = mysqli_fetch_array($res,MYSQLI_ASSOC)) $result[] = $bookcomment;
		if(!empty($result))
		{
			echo json_encode($result);
			echo "<br />";
			var_dump($result);
		}
		mysqli_close($dbc);
	}
	*/
?>
