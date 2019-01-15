<?php
include ('mysqli_connect.php');



if ($_SERVER["REQUEST_METHOD"] == "POST")
{

		$act = $_POST['act'];
		if($act == "get_station"){
		$sql = "select * from box_station;";
		$query_res=mysqli_query($dbc,$sql);
		if($query_res){
		while($resc1 = mysqli_fetch_array($query_res,MYSQLI_ASSOC)) $result[] = $resc1;
		if(!empty($result)){
		echo json_encode($result);
		}
		else echo 0;
		}
		}
	
}

mysqli_close($dbc);
?>