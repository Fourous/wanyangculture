<?php

include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$uid = $_POST['uid'];
	$pwd = $_POST['pwd'];
	$sqli = "select pwd from user_info where telephone = '{$uid}';";
	$result = mysqli_query($dbc,$sqli);
	$old_pwd = mysqli_fetch_array($result,MYSQLI_ASSOC);
	if($pwd == $old_pwd['pwd']) echo 0;
	else{
	$sql = "update user_info set pwd = '{$pwd}' where telephone = '{$uid}';";
	$res = mysqli_query($dbc,$sql);
	if($res){
		echo 1;
	}
	else echo null;
	}
}
mysqli_close($dbc);
?>