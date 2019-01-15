<?php
include ('php/mysqli_connect.php');

$sql="select * from book order by lend_count desc limit 4;";
$query_res=mysqli_query($dbc,$sql);
if($query_res){
$resc1 = mysqli_fetch_array($query_res,MYSQLI_ASSOC);
$resc2 = mysqli_fetch_array($query_res,MYSQLI_ASSOC);
$resc3 = mysqli_fetch_array($query_res,MYSQLI_ASSOC);
$resc4 = mysqli_fetch_array($query_res,MYSQLI_ASSOC);
}
//var_dump($resc1);
//var_dump(json_encode($resc1));


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$getid = $_POST['id'];
	if($getid == "listbook_1"){
		echo json_encode($resc1);
	}
	if($getid == "listbook_2"){
		echo json_encode($resc2);
	}
	if($getid == "listbook_3"){
		echo json_encode($resc3);
	}
	if($getid == "listbook_4"){
		echo json_encode($resc4);
	}
}
//var_dump(json_encode());
mysqli_close($dbc);
?>

