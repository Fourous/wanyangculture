<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/9/15
 * Time: 4:48
 */
include "mysqli_connect.php";

if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $uid= $_POST['uid'];
    $sql1= "select * from person_col WHERE col_uid='{$uid}'";
    $sql2= "select * from person_col WHERE uid='{$uid}'";
    $res1= mysqli_query($dbc, $sql1);
    $res2= mysqli_query($dbc, $sql2);
    $num1= mysqli_num_rows($res1);
    $num2= mysqli_num_rows($res2);
    $mes= array(
        $num1,$num2
    );
    /*num1是被关注的人数，num2是关注的人数*/
    echo json_encode($mes);
}
?>
