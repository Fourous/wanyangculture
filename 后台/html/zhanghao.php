<?php
	session_start();
	$username = $_SESSION['username'];
	include('php/mysqli_connect.php');
	
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$oldpass = $_POST['oldpass'];
		$newpass = $_POST['newpass'];
		$repeat_newpass = $_POST['repeat_newpass'];
	}
	
	$sql = "SELECT pwd FROM user_info WHERE telephone ={$username};";
	$res = mysqli_query($dbc,$sql);
	$resa = mysqli_fetch_array($res);
	if($oldpass==$resa['pwd']){
		if($newpass==$repeat_newpass){
			$sql = "UPDATE user_info SET pwd={$newpass} WHERE telephone={$username};";
			if(mysqli_query($dbc,$sql)){
				echo "<script>alert('修改成功！');window.location='personIndex.html'</script>";
			}else{
				echo mysqli_error($dbc);
			}
		}else{
			echo "<script>alert('两次输入的密码不同，请重新输入！');window.location='zhanghao.html'</script>";
		}
	}else{
		echo "<script>alert('旧密码输入错误，请重新输入！');window.location='zhanghao.html'</script>";
	}