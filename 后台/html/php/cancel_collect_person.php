<?php


include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$uid = $_POST['uid'];
	$col_uid = $_POST['col_uid'];
	$sql = "delete from person_col where uid = '{$uid}' and col_uid = '{$col_uid}';";
	$res = mysqli_query($dbc,$sql);
	if($res){
		echo 1;
	}
	else echo 0;
}
mysqli_close($dbc);
?>