<?php
include ('mysqli_connect.php');



if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	    $bookid = $_POST['bookid'];
		$sql="select * from book where bookid = '{$bookid}';";
		$query_res=mysqli_query($dbc,$sql);
		if($query_res){
            while($bookcomment = mysqli_fetch_array($query_res,MYSQLI_ASSOC)) $result[] = $bookcomment;
			echo json_encode($result);
		}else{
			$mes= "meiyoushuju";
			echo json_encode($mes);
		}
	}
mysqli_close($dbc);
?>

