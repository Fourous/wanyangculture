<?php


include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$uid = $_POST['uid'];
	//$comment_uid = $_POST['commet_uid'];
	$commentid = intval($_POST['commentid']);
	$sql = "delete from comment_collect where uid = '{$uid}' and commentid = '{$commentid}' ;";
	$res = mysqli_query($dbc,$sql);
	if($res){
		echo 1;
	}
	else echo 0;
}
mysqli_close($dbc);
?>