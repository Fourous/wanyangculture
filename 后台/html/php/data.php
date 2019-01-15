<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/10/24
 * Time: 15:08
 */

include "mysqli_connect.php";

$uid= $_POST['uid'];
$sqlrecord= "select * from lend_record WHERE lend_date is not null AND return_date is not null AND uid='{$uid}'";
$resrecord= mysqli_query($dbc, $sqlrecord);
$rowrecord= mysqli_fetch_array($resrecord);
if ($rowrecord){
    echo json_encode($rowrecord);
}else{
    echo 0;
}
?>