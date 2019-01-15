<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/9/18
 * Time: 1:36
 */
include "mysqli_connect.php";

$uid= $_POST['uid'];
$sql= "insert into user_share(uid) VALUES ('{$uid}')";
$res= mysqli_query($dbc, $sql);
if ($res){
    echo 1;
}else{
    echo 0;
}
?>