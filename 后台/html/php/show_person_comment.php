<?php
include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$uid = $_POST['uid'];
	$sql = "select 
			user_info.nickname,
			book_comment.comment,
			book_comment.bookname,
			book_comment.comment_time,
			book_comment.commentid 
			from user_info 
			join book_comment 
			on telephone = uid 
			where uid = '{$uid}'
			order by commentid desc
			limit 50;";
	$res = mysqli_query($dbc,$sql);
	if($res){
		while($bookcomment = mysqli_fetch_array($res,MYSQLI_ASSOC)) $result[] = $bookcomment;
		if(!empty($result))
		{
			echo json_encode($result);
		}
	}
}
mysqli_close($dbc);
?>