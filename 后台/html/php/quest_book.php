<?php
include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	//$uid = $_POST['uid'];
	$bookname = $_POST['bookname'];
	//$comment = $_POST['comment'];
	$sql = "select * from book where bookname like '{$bookname}';";
	$res = mysqli_query($dbc,$sql);
	if($res){
		while($resc1 = mysqli_fetch_array($query_res,MYSQLI_ASSOC)) $result[] = $resc1;
		echo json_encode($result);
	}
}
mysqli_close($dbc);
?>