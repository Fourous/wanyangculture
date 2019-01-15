<?php
	session_start();
	include('php/mysqli_connect.php');
	
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$telephone =$_POST['zhanghao'];
		$password =$_POST['mima'];
	}
	
	$sql = "select * from user_info where telephone={$telephone} and pwd={$password}";
	$res = mysqli_query($dbc,$sql);
	
	$sql_exist = "select telephone from user_info where telephone={$telephone}";
	$res_exist = mysqli_query($dbc,$sql_exist);
	
	if($telephone==null){
		echo "<script>alert('用户名不能为空！');window.location='login.html';</script>";
		
	}else if($password==null){
		echo "<script>alert('密码不能为空！')</script>";
	}else if(mysqli_num_rows($res_exist) == 1){
		if(mysqli_num_rows($res) == 1){

			$_SESSION['username'] = $telephone;
			echo "<script>window.location='personIndex.php'</script>";
		}else{
			echo "<script>alert('用户名或密码错误，请重新输入！');
				window.location='login.html';
			</script>";
		}
	}else{
		echo "<script>alert('此用户不存在，请前往注册！');window.location='register.html';</script>";
	}
?>	
	
	
	
	