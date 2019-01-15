<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/9/18
 * Time: 0:32
 */
include "mysqli_connect.php";
$uid= $_POST['uid'];
$type= $_POST['type'];
$sql= "update user_info set usertype='{$type}' WHERE telephone='{$uid}'";
$res= mysqli_query($dbc, $sql);
$row= mysqli_fetch_array($res);
if ($res){
    echo 1;
}else{
    echo 0;
}
?>
