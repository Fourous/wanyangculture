<?php
include('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$bookid = $_POST['rfid'];
	$bookname = $_POST['bookname'];
	$author = $_POST['author'];
	$boxid = $_POST['boxid'];
	$cpdid = $_POST['cpdid'];
	$ISBN = $_POST['ISBN'];
	$desc = $_POST['desc'];
	$type = $_POST['type'];
	$edition = $_POST['edition'];
//插入书本表
$sql_book = "insert into book set bookid = '{$bookid}',bookname = '{$bookname}',type = '{$type}',
								  author = '{$author}',brief = '{$desc}',edition = '{$edition}',
								  ISBN = '{$ISBN}', upload_date = unix_timestamp(now());";
//插入箱子表
$sql_box = "insert into book_box set boxid = {$boxid},cpdid = {$cpdid},bookid = '{$bookid}';";

if(mysqli_query($dbc,$sql_book)&&mysqli_query($dbc,$sql_box))
{
	echo "<script language=javascript>alert('书籍添加成功');window.location='backIndex.php';</script> ";
}
else echo "<script language=javascript>alert('书籍添加失败');window.location='backIndex.php';</script> ";
mysqli_close($dbc);
}

