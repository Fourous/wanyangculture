<?php
include ('mysqli_connect.php');



if ($_SERVER["REQUEST_METHOD"] == "POST")
{
		$uid = $_POST['uid'];
		$sql="select * from book where bookid in(select bookid from book_collection where uid = '{$uid}');";
		$query_res=mysqli_query($dbc,$sql);
		if($query_res){
		while($resc1 = mysqli_fetch_array($query_res,MYSQLI_ASSOC)) $result[] = $resc1;
		
		echo json_encode($result);
		}
		
	

}

mysqli_close($dbc);

?>