<?php
include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$uid = $_POST['uid'];
	$bookname = $_POST['bookname'];
	$comment = $_POST['comment'];
	$time= time();
	$sql = "insert into book_comment 
	set bookname = '{$bookname}',
		uid = '{$uid}',
		comment = '{$comment}',
		comment_time = '{$time}'
		;";
	$res = mysqli_query($dbc,$sql);
	if($res){
	    $sql1= "select * from book_comment WHERE uid='{$uid}' and comment_time='{$time}'";
	    $res1= mysqli_query($dbc,$sql1);
	    $row= mysqli_fetch_array($res1);
	    if ($row==false){
	        $mes="meiyoushuju";
	        echo json_encode($mes);
        }else{
	        $mes= $row[3];
	        echo json_encode($mes);
        }
	}
	else echo 0;
}
mysqli_close($dbc);
?>
