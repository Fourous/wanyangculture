<?php
include ('mysqli_connect.php');

//var_dump($resc1);
//var_dump(json_encode($resc1));


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
		$type = $_POST['type'];
		$fir= $_POST['fir'];
		//echo json_encode($type);
		$sql="select bookid from book where type = '{$type}' order by lend_count desc limit $fir,20;";
		$query_res=mysqli_query($dbc,$sql);
		if($query_res){
		while($resc1 = mysqli_fetch_array($query_res,MYSQLI_ASSOC)) $result[] = $resc1;
		echo json_encode($result);
        }
}
//var_dump(json_encode());
mysqli_close($dbc);
?>