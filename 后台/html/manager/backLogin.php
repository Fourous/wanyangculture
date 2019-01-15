<?php
	session_start();
	include('mysqli_connect.php');
	
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$username =$_POST['zhanghao'];
		$password =$_POST['mima'];

	
	$sql = "select * from back_user where username='{$username}' and password='{$password}';";
	$res = mysqli_query($dbc,$sql);
	
	$sql_exist = "select * from back_user where username='{$username}';";
	$res_exist = mysqli_query($dbc,$sql_exist);
	
	if(empty($username)){
		echo "<script>alert('用户名不能为空！');window.location='index.html';</script>";	
	}else if(empty($password)){
		echo "<script>alert('密码不能为空！');window.location='index.html';</script>";
	}else if(mysqli_num_rows($res_exist) == 1){
		if(mysqli_num_rows($res) == 1){
			
			$_SESSION['username'] = $username;
			echo "<script>window.location='backIndex.php';</script>";
		}else{
			echo "<script>alert('密码错误，请重新输入！');
				window.location='index.html';
			</script>";
		}
	}else{
		echo "<script>alert('此用户不存在！');window.location='index.html';</script>";
	}
		}
		mysqli_close($dbc);
?>	