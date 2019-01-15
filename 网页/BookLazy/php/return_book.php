<?php


include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$act = $_POST['id'];
	if($act == "returnbook"){
	$Suid = $_POST['uid'];
	$uid = intval($Suid);
	$Sbookid = $_POST['bookid'];
	$bookid = intval($Sbookid);
	$sql = "update lend_record set return_date = unix_timestamp(now()) where uid = {$uid} and bookid = {$bookid};";
	$result = mysqli_query($dbc,$sql);
	if($result){
		echo "还书成功！";
	}
	}
	$sqli = "select return_date-lend_date from lend_record;";
	$res = mysqli_query($dbc,$sqli);
	$time_temp = mysqli_fetch_array($res);
	$time = $res[0];
}

mysqli_close($dbc);
?>
