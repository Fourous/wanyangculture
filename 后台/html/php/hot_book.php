<?php
include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$getid = $_POST['id'];
	$first= $_POST['fir'];
	if($getid == "list_hot"){
		$sql="select * from book order by lend_count desc limit $first,20;";
		$query_res=mysqli_query($dbc,$sql);
		if($query_res){
		while($resc1 = mysqli_fetch_array($query_res,MYSQLI_ASSOC)) $result[] = $resc1;
		echo json_encode($result);
	}
	}
	if($getid == "list_recommend"){
		$sql="select * from book order by bookid desc limit $first,20;";
		$query_res=mysqli_query($dbc,$sql);
		if($query_res){
		while($resc1 = mysqli_fetch_array($query_res,MYSQLI_ASSOC)) $result[] = $resc1;
		echo json_encode($result);
	}

}
	}
mysqli_close($dbc);

?>
