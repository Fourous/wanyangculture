<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/10/12
 * Time: 23:37
 */
include "mysqli_connect.php";

$sql= "select * from book_box WHERE cpdstate=0";
$res= mysqli_query($dbc, $sql);
$row_num= mysqli_num_rows($res);
if ($row_num> 0){
    echo 0;
}else{
    echo 1;
}
?>

