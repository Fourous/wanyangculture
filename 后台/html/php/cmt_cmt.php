<?php
include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$uid = $_POST['uid'];
	$cmt_id = $_POST['commentid'];
	$comment = $_POST['reputationStr'];
	$sql = "insert into cmt_cmt
	set cmt_cmt_id = '{$cmt_id}',
		uid = '{$uid}',
		comment = '{$comment}',
		cmt_time = unix_timestamp(now())
		;";
	$res = mysqli_query($dbc,$sql);
	if($res){
		echo 1;
	}
	else echo 0;
}
mysqli_close($dbc);
?>