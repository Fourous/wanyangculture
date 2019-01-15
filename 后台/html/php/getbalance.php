<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/10/13
 * Time: 12:14
 */
include "mysqli_connect.php";

$uid= $_POST['uid'];

$sql= "select * from account WHERE uid='{$uid}'";
$res= mysqli_query($dbc, $sql);
$row= mysqli_fetch_array($res);

$balance= $row['balance'];

echo json_encode($balance);

?>
