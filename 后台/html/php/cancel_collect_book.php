<?php


include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$uid = $_POST['uid'];
	$bookid = intval($_POST['bookid']);
	$sql = "delete from book_collection where uid = '{$uid}' and bookid = {$bookid};";
	$res = mysqli_query($dbc,$sql);
	if($res){
		echo 1;
	}
}
mysqli_close($dbc);
?>