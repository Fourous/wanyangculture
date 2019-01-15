<?php
include('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $telephone =$_POST['telephone'];
	$password =$_POST['password'];

}
$resql = "select * from user_info where telephone={$telephone}";
$reres = mysqli_query($dbc,$resql);
if(mysqli_num_rows($reres)>0){
echo "exist_persion!";
}else{
$sql = "INSERT INTO user_info(telephone,pwd) VALUES ('{$telephone}','{$password}')";
if(mysqli_query($dbc,$sql))
	echo "success!";
}
?>