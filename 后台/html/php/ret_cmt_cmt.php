<?php
include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$cmt_cmt_id = intval($_POST['commentid']);
	$sql = "select * from cmt_cmt where cmt_cmt_id = {$cmt_cmt_id};";
	$res = mysqli_query($dbc,$sql);
	if($res){
		while($cmt_cmt = mysqli_fetch_array($res,MYSQLI_ASSOC)) 
		{	
		$cmt_cmt['avatarUrl'] = '';
		$result[] = $cmt_cmt;
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