<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/9/20
 * Time: 20:35
 */
include "mysqli_connect.php";

$boxid= $_POST['boxid'];
$cpdid= $_POST['cpdid'];

$sql= "select * from book_box WHERE boxid='{$boxid}' AND cpdid= '{$cpdid}'";
$res= mysqli_query($dbc, $sql);
$row= mysqli_fetch_array($res);
$data= $row[2];

echo json_encode($data);
?>