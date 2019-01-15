<?php
include ('mysqli_connect.php');

//var_dump($resc1);
//var_dump(json_encode($resc1));


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$getid = $_POST['id'];
	if($getid == "list_hot"){
		$sql="select * from book order by lend_count desc limit 10;";
		$query_res=mysqli_query($dbc,$sql);
		if($query_res){
		while($resc1 = mysqli_fetch_array($query_res,MYSQLI_ASSOC)) $result[] = $resc1;
		echo json_encode($result);
	}
	if($getid == "list_recommend"){
		$sql="select * from book order by bookid desc limit 10;";
		$query_res=mysqli_query($dbc,$sql);
		if($query_res){
		while($resc1 = mysqli_fetch_array($query_res,MYSQLI_ASSOC)) $result[] = $resc1;
		echo json_encode($result);
	}

}
//var_dump(json_encode());
mysqli_close($dbc);
?>