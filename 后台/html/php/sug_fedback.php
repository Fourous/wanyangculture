<?php

include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$uid = $_POST['uid'];
	$sug = $_POST['sug'];
	$sql = "insert into sug_fedback set uid = '{$uid}' , suggestion = '{$sug}';";
	$res = mysqli_query($dbc,$sql);
	if($res){
		echo 1;
	}
	else echo 0;
}
mysqli_close($dbc);
?>