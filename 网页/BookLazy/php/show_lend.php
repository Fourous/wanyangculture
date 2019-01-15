<?php
include ('mysqli_connect.php');



if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	//$getid = $_POST['id'];
	//if($getid == "showlend"){
		$uid = $_POST['uid'];
		$sql="select 
				lend_record.*,
				book.bookname 
				from lend_record 
				join book 
				on lend_record.bookid = book.bookid 
				where uid = {$uid};";
		$query_res=mysqli_query($dbc,$sql);
		if($query_res){
		while($resc1 = mysqli_fetch_array($query_res,MYSQLI_ASSOC)) $result[] = $resc1;
		
		echo json_encode($result);
		}
		
	//}

}

mysqli_close($dbc);
?>
