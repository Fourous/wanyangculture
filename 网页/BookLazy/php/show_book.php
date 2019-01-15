<?php
include ('mysqli_connect.php');



if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$getid = $_POST['id'];
	if($getid == "showbook"){
		$bookid = $_POST['bookid'];
		$sql="select * from book where bookid = {$bookid};";
		$query_res=mysqli_query($dbc,$sql);
		if($query_res){
		$resc1 = mysqli_fetch_array($query_res,MYSQLI_ASSOC);
		echo json_encode($resc1);
		}
		
	}

}

mysqli_close($dbc);
?>

