<?php
include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$uid = $_POST['uid'];
	$sql = "select * from person_col where uid = '{$uid}';";
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