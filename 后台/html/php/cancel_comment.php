<?php
include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$uid = $_POST['uid'];
	//$bookname = $_POST['bookname'];
	$commentid = $_POST['commentid'];
	$sql = "delete from book_comment 
	    where
		uid = '{$uid}'
		and
		commentid = '{$commentid}'
		;";
	$res = mysqli_query($dbc,$sql);
	if($res){
		echo 1;
	}
}
mysqli_close($dbc);
?>