<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/9/21
 * Time: 3:12
 */
include "mysqli_connect.php";
$uid= $_POST['uid'];
$total_fee= $_POST['total_fee'];
$body= $_POST['body'];
$sql1="select * from account where uid='{$uid}'";
$res1= mysqli_query($dbc, $sql1);
$row1= mysqli_fetch_array($res1);
if($row1){
    if($body=="充值押金") {
        $total_fee = floatval($total_fee);
        $sql = "UPDATE account set deposit= deposit+ '{$total_fee}' where uid='{$uid}'";
        mysqli_query($dbc,$sql);
	echo 1;
    }
    else if($body=="充值余额"){
        $total_fee = floatval($total_fee);
        $sql_balance ="UPDATE account set balance= balance+ '{$total_fee}' where uid='{$uid}'";
        mysqli_query($dbc,$sql_balance);
    }
    echo 1;
}else{
    if($body=="充值押金") {
        $total_fee = floatval($total_fee);
        $sql = "insert into account(uid,deposit) values ('{$uid}','{$total_fee}')";
        mysqli_query($dbc,$sql);
	echo 2;
    }
    else if($body=="充值余额"){
        $total_fee = floatval($total_fee);
        $sql_balance ="insert into account(uid,balance) values ('{$uid}','{$total_fee}')";
        mysqli_query($dbc,$sql_balance);
    }
    echo 2;
}
?>
