<?php
/**
 * Created by PhpStorm.
 * User: fouro
 * Date: 2018/9/18
 * Time: 5:59
 */
include "mysqli_connect.php";

$code= $_POST['code'];
$sql= "select * from usercode where code='{$code}'";
$res= mysqli_query($dbc, $sql);
$row= mysqli_fetch_row($res);
if($row==false){
    echo -1;
}else{
    $type= $row[1];
    $sqld= "delete from usercode WHERE code='{$code}'";
    $resd= mysqli_query($dbc, $sqld);
    if ($resd){
        echo $type;
    }else{
        echo -2;
    }

}
?>
