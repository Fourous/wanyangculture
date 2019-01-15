<?php


include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$uid = $_POST['uid'];
	$comment_uid = $_POST['commet_uid'];
	$commentid = intval($_POST['commentid']);
	$sql = "insert into book_collection values('{$uid}','{$comment_uid}',{$commentid});";
	$res = mysqli_query($dbc,$sql);
	if($res){
		echo "success!";
	}
}
mysqli_close($dbc);
?>