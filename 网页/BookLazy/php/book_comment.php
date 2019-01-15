<?php
include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$uid = $_POST['uid'];
	$bookid = intval($_POST['bookid']);
	$comment = $_POST['comment'];
	$sql = "insert into book_comment values('{$uid}',{$bookid},'{$comment}');";
	$res = mysqli_query($dbc,$sql);
	if($res){
		echo "success!";
	}
}
mysqli_close($dbc);
?>