<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/9/18
 * Time: 1:32
 */
include "mysqli_connect.php";

$uid=  $_POST['uid'];
$sql= "select * from user_share WHERE uid='{$uid}'";
$res= mysqli_query($dbc, $sql);
$result=array();
$row= mysqli_fetch_array($res);
if ($row== false){
    echo 0;
}else{
    do{
        $mes=array(
            $row[0],$row[1],$row[2],$row[3],$row[4],$row[5],$row[6]
        );
        array_push($result,$mes);
    }while($row= mysqli_fetch_array($res));
    echo json_encode($result);
}
?>
