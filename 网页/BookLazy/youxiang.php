<?php
	session_start();
	$username = $_SESSION['username'];
	include('php/mysqli_connect.php');
	
	if($_SERVER["REQUEST_METHOD"] == "POST") {
		$old_email = $_POST['old_email'];
		$new_email = $_POST['new_email'];
	}
	
	$sql = "SELECT email FROM user_info WHERE telephone={$username};";
	$res = mysqli_query($dbc,$sql);
	$resa = mysqli_fetch_array($res);
	if($new_email!=null){
		if($resa['email']!=null){
			if($resa['email']!=$old_wechat){
				echo "<script>alert('原有邮箱输入不对，请重新输入！');window.location='youxiang.html'</script>";
			}
		}
		$sql = "UPDATE user_info SET email='{$new_email}' WHERE telephone={$username};";
		if(mysqli_query($dbc,$sql)){
			echo "<script>alert('修改成功');window.location='personIndex.php'</script>";
		}else{
			echo mysqli_error($dbc);
		}
	}else{
		echo "<script>alert('请确保新的邮箱不能为空！');window.location='youxiang.html'</script>";
	}