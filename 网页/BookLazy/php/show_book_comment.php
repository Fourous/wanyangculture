<?php
include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$bookid = intval($_POST['bookid']);
	$sql = "select user_info.telephone,
			user_info.nickname,
			user_info.picture,
			book_comment.comment,
			book_comment.uid,
			book_comment.commentid 
			from user_info 
			join book_comment 
			on telephone = uid 
			where 
				bookid = {$bookid}
			order by commentid desc
			limit 20;";
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