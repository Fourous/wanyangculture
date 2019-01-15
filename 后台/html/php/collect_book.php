<?php


include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$uid = $_POST['uid'];
	$bookid = intval($_POST['bookid']);
	$sql = "insert into book_collection set uid = '{$uid}',bookid = '{$bookid}';";
	$res = mysqli_query($dbc,$sql);
	if($res){
		echo 1;
	}
}
mysqli_close($dbc);
?>
