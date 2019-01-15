<?php
include('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $telephone =$_POST['telephone'];
	$password =$_POST['password'];
	$true_name = $_POST['true_name'];
	$ID_card = $_POST['ID_card'];

}
$resql = "select * from user_info where telephone={$telephone}";
$reres = mysqli_query($dbc,$resql);
if(mysqli_num_rows($reres)>0){
echo 0;
}else{
$sql = "INSERT INTO user_info(telephone,pwd,true_name,ID_card) VALUES ('{$telephone}','{$password}','{$true_name}','{$ID_card}');";
if(mysqli_query($dbc,$sql)){
    $sqli="insert into account(uid) values ('{$telephone}')";
    if (mysqli_query($dbc, $sqli)){
        echo 1;
    }
}
}
?>
