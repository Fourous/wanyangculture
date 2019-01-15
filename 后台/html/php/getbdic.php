<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/9/18
 * Time: 0:20
 */
include "mysqli_connect.php";

$uid= $_POST['uid'];
$sql= "select * from account WHERE uid='{$uid}'";
$res= mysqli_query($dbc, $sql);
$row=  mysqli_fetch_array($res);
if($row== false){
    echo json_encode("无该用户信息");
}else{
    $mes= array(
	$row[0],$row[1],$row[2],$row[3],$row[4]
);
	echo json_encode($mes);
}
?>
