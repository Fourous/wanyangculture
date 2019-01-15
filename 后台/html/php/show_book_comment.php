<?php
include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$bookid = intval($_POST['bookname']);
	$sql = "select user_info.telephone,
			user_info.nickname,
			book_comment.comment,
			book_comment.comment_time,
			book_comment.commentid 
			from user_info 
			join book_comment 
			on telephone = uid 
			where 
				bookname = '{$bookname}'
			order by commentid desc
			limit 50;";
	$res = mysqli_query($dbc,$sql);
	if($res){
		while($bookcomment = mysqli_fetch_array($res,MYSQLI_ASSOC)) 
		{	
		$bookcomment['avatarUrl'] = '';
		$result[] = $bookcomment;
		}
		if(!empty($result))
		{
			echo json_encode($result);
		}
		else echo 0;
	}
}
mysqli_close($dbc);
?>