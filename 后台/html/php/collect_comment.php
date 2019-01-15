<?php


include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$uid = $_POST['uid'];
	$commentid = intval($_POST['commentid']);
	$sql = "insert into comment_collect values('{$uid}',{$commentid});";
	$res = mysqli_query($dbc,$sql);
	if($res){
		echo 1;
	}
	else echo 0;
}
mysqli_close($dbc);
?>