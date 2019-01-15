<?php
include ('mysqli_connect.php');



if ($_SERVER["REQUEST_METHOD"] == "POST")
{
		$uid = $_POST['uid'];
		$bookname = $_POST['bookname'];
		$sql="insert into lend_record set uid = '{$uid}',bookname = {$book_id},share_time = unix_timestamp(now());";
		$query_res=mysqli_query($dbc,$sql);
		if($query_res){
		$sql="select share_id from user_share where uid = '{$uid}';";
		$query_res=mysqli_query($dbc,$sql);
		echo json_encode($result);
		}
		else echo 0;
	

}

mysqli_close($dbc);

?>