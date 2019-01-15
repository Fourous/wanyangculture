<?php
	session_start();
	$username = $_SESSION['username'];
	include('php/mysqli_connect.php');
	
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$old_wechat = $_POST['old_wechat'];
		$new_wechat = $_POST['new_wechat'];
	}
	
	$sql = "SELECT wechat FROM user_info WHERE telephone={$username};";
	$res = mysqli_query($dbc,$sql);
	$resa = mysqli_fetch_array($res);
	if($new_wechat!=null){
		if($resa['wechat']!=null){
			if($resa['wechat']!=$old_wechat){
				echo "<script>alert('原有微信号输入不对，请重新输入！');window.location='weixin.html'</script>";
			}
		}
		$sql = "UPDATE user_info SET wechat={$new_wechat} WHERE telephone={$username};";
		if(mysqli_query($dbc,$sql)){
			echo "<script>alert('修改成功');window.location='personIndex.php'</script>";
		}else{
			echo mysqli_error($dbc);
		}
	}else{
		echo "<script>alert('请确保新的微信号不能为空！');window.location='weixin.html'</script>";
	}