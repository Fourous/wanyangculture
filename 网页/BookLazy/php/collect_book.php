<?php


include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$uid = $_POST['uid'];
	$bookid = intval($_POST['bookid']);
	$sql = "insert into book_collection values({$uid},{$bookid});";
	$res = mysqli_query($dbc,$sql);
	if($res){
		echo "success!";
	}
}
mysqli_close($dbc);
?>
