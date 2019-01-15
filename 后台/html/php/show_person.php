<?php
include ('mysqli_connect.php');



if ($_SERVER["REQUEST_METHOD"] == "POST")
{

		$uid = $_POST['uid'];
		$sql = "select nickname,signature,sex,birthday,address,wechat,email,usertype from user_info where telephone = '{$uid}';";
		$query_res=mysqli_query($dbc,$sql);
		if($query_res){
		$resc1 = mysqli_fetch_array($query_res,MYSQLI_ASSOC);
		if(!empty($resc1)){
		echo json_encode($resc1);
		}
		else echo 0;
		}
	
	
}

mysqli_close($dbc);
?>
