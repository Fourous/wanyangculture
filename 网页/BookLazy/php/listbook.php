<?php
include ('mysqli_connect.php');

$sql="select * from book order by lend_count desc limit 4;";
$query_res=mysqli_query($dbc,$sql);
if($query_res){
$resc1 = mysqli_fetch_array($query_res);
$resc2 = mysqli_fetch_array($query_res);
$resc3 = mysqli_fetch_array($query_res);
$resc4 = mysqli_fetch_array($query_res);
}


$book = array(
	"book1" => $resc1,
	"book2" => $resc2,
	"book3" => $resc3,
	"book4" => $resc4
);
var_dump($book);
if ($_SERVER["REQUEST_METHOD"] == "POST"){
	
$optype = $_POST['id'];

if($optype == "listbooks"){
echo json_encode($book);
}
}
?>