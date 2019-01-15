<?php
include('php/mysqli_connect.php');
include('tools.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $telephone =$_POST['telephone'];
	$password =$_POST['password'];
	$repeat =$_POST['repassword'];
}

if(!empty($telephone)&&!empty($password)&&!empty($repeat)){
	if(!check_phone($telephone)){
		echo "<script>alert('非法的电话号码，请重新输入！')</script>";
		echo "<script>window.location='register.html'</script>";
	}else if(!check_password($password)){
		echo "<script>alert('密码长度为6-16位，请重新输入！')</script>";
		echo "<script>window.location='register.html'</script>";
	}else{
		$resql = "select * from user_info where telephone={$telephone}";
		$reres = mysqli_query($dbc,$resql);
		if(mysqli_num_rows($reres)>0){
			echo "<script>alert('此用户名已存在，请登录')</script>";
			echo "<script>window.location='login.html'</script>";
		}
		else if($password!=$repeat){
			echo "<script>alert('两次输入的密码不一样！')</script>";
			echo "<script>window.location='register.html'</script>";
		}else{
			$sql = "INSERT INTO user_info(telephone,pwd) VALUES ('{$telephone}','{$password}')";
			mysqli_query($dbc,$sql);
			//$sqls = "INSERT INTO user_info(nickname,username,signature,sex,birthday,address,telephone,wechat,email) VALUES ('',$telephone,'','','','',$telephone,'','')";
			//mysqli_query($dbc,$sqls);
			echo "<script>alert('注册成功！')</script>";
			echo "<script>window.location='login.html'</script>";
		}
	}
}else{
		echo "<script language=javascript>alert('信息不能为空！')</script>";
		echo "<script language=javascript>window.location.href='register.html'</script>";
	}