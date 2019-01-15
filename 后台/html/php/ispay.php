<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/9/23
 * Time: 6:08
 */

include "mysqli_connect.php";

$uid= $_POST['uid'];
$sqlr= "select * from lend_record WHERE uid='{$uid}' and lend_date is NOT NULL and return_date is NOT NULL and ispay=0";
$resr= mysqli_query($dbc, $sqlr);
$rowr= mysqli_fetch_array($resr);
if($rowr== false){
    echo 0;
}else{
    $total= 0;
    $temp= 0;
    do{
        $temp= intval($rowr[4]);
        $total+= $temp;
    }while($rowr= mysqli_fetch_array($resr));
    $sqlu= "update lend_record set ispay=1 WHERE lend_date is NOT NULL and return_date is NOT NULL AND uid='{$uid}' AND ispay=0";
    $resu= mysqli_query($dbc, $sqlu);
    $sqlrem="update account set balance=balance-'{$total}' WHERE uid='{$uid}'";
    $resrem= mysqli_query($dbc, $sqlrem);
    if ($resu){
        echo $total;
    }else{
        echo 0;
    }



}



?>
