<?php
include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$uid = intval($_POST['uid']);
	$sql = "select * from book_comment where commentid in (select commentid from comment_collect where uid = '{$uid}');";
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