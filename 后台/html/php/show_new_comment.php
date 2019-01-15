<?php
include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$uid = $_POST['uid'];
	$sql = "select user_info.telephone,
			user_info.nickname,
			book_comment.comment,
			book_comment.uid,
			book_comment.commentid ,
			book_comment.comment_time
			from user_info 
			join book_comment 
			on telephone = uid 
			order by commentid desc
			limit 5;";
	$res = mysqli_query($dbc,$sql);
	if($res){
		while($bookcomment = mysqli_fetch_array($res,MYSQLI_ASSOC)) {
			$commentid = intval($bookname['commentid']);
			$sqli = "select * from comment_collect where uid = '{$uid}' and commentid = {$commentid};";
			$resli = mysqli_query($dbc,$sqli);
			$resc1 = mysqli_fetch_array($query_res,MYSQLI_ASSOC);
			if(!empty($resc1)) $cat = 1;
			else $cat = 0;
			$bookcomment['state']=$cat;
			$bookcomment['img_url'] = ' ';
			$result[] = $bookcomment;
			//$result['state'] = $cat;
		}
		if(!empty($result))
		{
			echo json_encode($result);
		}
		else echo 'null';
	}
	else echo 'no comment';
}
mysqli_close($dbc);
?>
