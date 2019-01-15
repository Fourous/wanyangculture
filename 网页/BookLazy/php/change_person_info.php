<?php

include ('mysqli_connect.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$nickname = $_POST['nickname'];//昵称
		$introduction = $_POST['introduction'];//个人简介
		$sex = $_POST['xingbie'];//性别
		$birthday = $_POST['birthday'];//生日
		$address = $_POST['address'];//地址
		$weixin = $_POST['wechat'];//微信号
		$email = $_POST['eamil'];//邮箱
	
	
	$sql = "UPDATE user_info 
			SET nickname='{$nickname}',
				signature='{$introduction}',
				sex='{$sex}',
				birthday='{$birthday}',
				address='{$address}',
				wechat = '{$weixin}',
				email = '{$eamil}'
			WHERE telephone={$username};";
	
	$resa=mysqli_query($dbc,$sql);
	if($resa==1)
    {
        echo "success!";
        
    }
    else
    {
        echo "change_error!";
    }
}
mysqli_close($dbc);
?>