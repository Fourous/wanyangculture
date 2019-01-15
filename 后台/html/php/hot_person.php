<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/9/15
 * Time: 4:43
 */
include "mysqli_connect.php";
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $fir= $_POST['fir'];
    $sql="select telephone from user_info ORDER BY booknum DESC limit $fir,20";
    $query_res=mysqli_query($dbc,$sql);
    if($query_res) {
        while ($resc1 = mysqli_fetch_array($query_res, MYSQLI_ASSOC)) $result[] = $resc1;
        echo json_encode($result);
    }
}
?>