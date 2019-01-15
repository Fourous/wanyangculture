<?php
	include('mysqli_connect.php');
	
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$telephone =$_POST['zhanghao'];
		$password =$_POST['password'];
	}
	
	$sql = "select * from user_info where telephone={$telephone} and pwd={$password}";
	$res = mysqli_query($dbc,$sql);
	
	$sql_exist = "select telephone from user_info where telephone={$telephone}";
	$res_exist = mysqli_query($dbc,$sql_exist);
	
	if(mysqli_num_rows($res_exist) == 1){
		if(mysqli_num_rows($res) == 1){
			echo "success!";
		}else{
			echo "pwd_error";
		}
	}else{
		echo "no_person";
	}
?>	
	