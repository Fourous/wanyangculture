<?php
	session_start();
	include('php/mysqli_connect.php');
	$uid = $_SESSION['username'];
	date_default_timezone_set('PRC');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>我的借阅</title>
    <link rel="stylesheet" href="css/person.css">
</head>
<body>
<?php
	$pagesize=5;
	$sql = "SELECT * FROM lend_record";
	$rs = mysqli_query($dbc,$sql);
	$lend_count = mysqli_num_rows($rs);
	$page_count = (int)(($lend_count-1)/$pagesize + 1);
	if(!isset($_GET["page_now"])){
		$page_now=1;
	}else{
		$page_now = $_GET["page_now"];
	}
	if($page_now < 1){
		$page_now = 1;
	}
	if($page_now > $page_count){
		$page_now = $page_count;
	}
	$start_bookid = ($page_now-1)*$pagesize;
	$sql = "SELECT lend_record.*,book.bookname,book.author
			FROM lend_record 
			JOIN book
			ON lend_record.bookid = book.bookid
			WHERE uid = {$uid}
			ORDER BY bookid 
			limit $start_bookid,$pagesize";
	$rs = mysqli_query($dbc,$sql);

?>
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
            <li><a href="zhanghao.html">账号设置</a></li>
            <li><a href="guanzhu.php">我的关注</a></li>
            <li class="active"><a href="jieyue.php">我的借阅</a></li>
            <li><a href="myshare.html">我的共享</a></li>
            <li><a href="zhifu.html">我的钱包</a></li>
        </ul>
    </div>
</div>
<div class="jy_content">
    <div class="jy_nr">
        <div class="title">
            <span class="lei">全部借阅</span>
            <span class="num"><?php echo $lend_count; ?></span>
        </div>
        <div class="nr">
            <table width="799" border="0" align="center" cellpadding="0" cellspacing="1" bgcolor="#FFFFFF" class="table" >
				<tr>
					<td width="6%" height="35" align="center" bgcolor="#FFFFFF">BookId</td>
					<td width="25%" align="center" bgcolor="#FFFFFF">书名</td>
					<td width="11%" align="center" bgcolor="#FFFFFF">作者</td>
					<td width="11%" align="center" bgcolor="#FFFFFF">借出日期</td>
					<td width="11%" align="center" bgcolor="#FFFFFF">应返还日期</td>
				</tr>
<?php
		while($rows = mysqli_fetch_assoc($rs)){
?>
				<tr align="center">
					<td class="td_bg" width="6%"><?php echo $rows["bookid"]?></td>
					<td class="td_bg" width="25%" height="26"><?php echo $rows["bookname"]?></td>
					<td class="td_bg" width="11%" height="26"><?php echo $rows["author"]?></td>
					<td width="33%" height="26" class="td_bg"><?php echo date('Y-m-d:H:i:s',(int)$rows["lend_date"])?></td>
					<td width="33%" height="26" class="td_bg"><?php echo $rows["return_date"]?></td>
					<td class="td_bg" width="20%">
				</tr>
				<?php
	}
?>
	    <tr>
      <th height="25" colspan="7" align="center" class="bg_tr">
    <?php
	if($page_now==1)
	{
	?>
	首页 | 上一页 | <a href="?page_now=<?php echo $page_now+1?>">下一页</a> | <a href="?page_now=<?php echo $page_count?>">末页</a>
	<?php
	}
	else if($page_now==$page_count)
	{
	?>
	<a href="?page_now=1">首页</a> | <a href="?page_now=<?php echo $page_now-1?>">上一页</a> | 下一页 | 末页
	<?php
	}
	else
	{
	?>
	<a href="?page_now=1">首页</a> | <a href="?page_now=<?php echo $page_now-1?>">上一页</a> | <a href="?page_now=<?php echo $page_now+1?>">下一页</a> | <a href="?page_now=<?php echo $page_count?>">末页</a>
	<?php
	}
?>
	&nbsp;页次：<?php echo $page_now ?>/<?php echo $page_count ?>页&nbsp;共有<?php echo $lend_count?>条信息 </th>
	  </tr>
</table>
        </div>
    </div>
</div>
</body>
</html>