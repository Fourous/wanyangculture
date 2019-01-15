<?php
	session_start();
	$username = $_SESSION['username'];
	include('php/mysqli_connect.php');
	
	$sqlb = "SELECT * FROM user_info WHERE telephone={$username}";
	$resb=mysqli_query($dbc,$sqlb);
	$resultb=mysqli_fetch_array($resb);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>账号设置</title>
    <link rel="stylesheet" href="css/person.css">
	<script type="text/javascript" src="js/jquery-3.2.1.js"></script>
</head>
<body>

<header>
    <div class="header">
        <div class="logo">
            <img src="img/logo_01.png" height="50px" alt="">
        </div>
        <div class="userInfo">
            <div class="userP">
                <a href="">
                    <img class="user" src="img/wx.png" height="50px" alt="">
                </a>
            </div>
            <div class="userList" style="display: none">
                <div>
                    <a href="">个人中心</a>
                </div>
                <div>
                    <a href="">设置</a>
                </div>
                <div>
                    <a href="">反馈</a>
                </div>
                <div>
                    <a href="">帮助</a>
                </div>
                <div>
                    <a href="">退出</a>
                </div>
            </div>
        </div>
    </div>
</header>
<div class="nav">
    <div class="nav_content">
        <ul>
            <li><a href="personIndex.php">个人中心</a></li>
            <li class="active"><a href="">账号设置</a></li>
            <li><a href="">我的关注</a></li>
            <li><a href="">我的借阅</a></li>
            <li><a href="">我的共享</a></li>
            <li><a href="">我的收藏</a></li>
            <li><a href="zhifu.html">我的钱包</a></li>
        </ul>
    </div>
</div>
<div id="main" class="zh_container">
    <div class="zh_concent">
        <div class="logo">账号设置</div>
        <div class="tabs clearfix">
            <a href="zhanghao.html" class="on">帐号安全</a>
        </div>
        <ul class="nav nav-tabs security-nav">
            <li><a href="zhanghao.html">修改密码</a></li>
            <li><a href="weixin.html">修改微信号</a></li>
            <li><a href="youxiang.html">修改邮箱</a></li>
            <li class="active"><a href="changeMessage.php">个人资料编辑</a></li>
        </ul>
        <div class="changeMessage_content">
            <div class="changeMessage_nr">
                <div class="title">
                    编辑信息
                </div>
				<form action="changeMessage.php" method="post">
                <div class="left">
                    <div>
                        <label for="nicheng">昵称</label>
                        <input value="<?php echo $resultb['nickname'];?>" type="text" id="nicheng" name="nickname">
                    </div>
                    <div>
                        <label for="jieshao">介绍</label><br>
                        <textarea name="introduction" id="jieshao" cols="30" rows="10" wrap="virtual"><?php echo $resultb['signature'];?></textarea>
                    </div>
                    <div>
                        <label for="xingbie">性别</label>
                        <input value="<?php echo $resultb['sex'];?>" type="text" name="xingbie" >  
                    </div>
                    <div>
                        <label for="birthday">出生日期</label>
                        <input value="<?php echo $resultb['birthday'];?>" type="date" value="" id="birthday" name="birthday">
                    </div>
                    <div>
                        <label for="address">住址</label>
                        <input value="<?php echo $resultb['address'];?>" type="text" id="address" name="address">
                    </div>
                    <div>
                        <input class="makeSure" type="submit" value="提交">
                    </div>
                </div>
				</form>
                <div class="right">
                    <a href=""><img src="img/logo_01.png" height="105px" alt=""></a>
                </div>
            </div>
        </div>
    </div>
</div>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$nickname = $_POST['nickname'];
		$introduction = $_POST['introduction'];
		$sex = $_POST['xingbie'];
		$birthday = $_POST['birthday'];
		$address = $_POST['address'];
	
	
	$sql = "UPDATE user_info 
			SET nickname='{$nickname}',
				signature='{$introduction}',
				sex='{$sex}',
				birthday='{$birthday}',
				address='{$address}'
			WHERE telephone={$username};";
	
	$resa=mysqli_query($dbc,$sql);
	if($resa==1)
    {
        echo "<script>alert('修改成功！')</script>";
        echo "<script>window.location.href='personIndex.php'</script>";
    }
    else
    {
        echo "<script>alert('修改失败！请重新输入！');</script>";
    }
}
	?>
</body>
</html>