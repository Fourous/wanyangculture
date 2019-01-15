<?php
/**
 * Created by PhpStorm.
 * User: fouro
 * Date: 2018/9/18
 * Time: 4:53
 */
include "mysqli_connect.php";
$uid= $_POST['uid'];
$money= $_POST['money'];
$type= $_POST['type'];
$type= intval($type);
$sql= "select * from user_info WHERE telephone='{$uid}'";
$res= mysqli_query($dbc, $sql);
$row= mysqli_fetch_row($res);
$type12= intval($row[12]);
if($type12<$type) {
    $sqlb = "select * from account WHERE uid='{$uid}'";
    $resb = mysqli_query($dbc, $sqlb);
    $rowb = mysqli_fetch_row($resb);
    $mon2 = intval($rowb[1]);
    $money = intval($money);
    if ($mon2 < $money) {
        echo 0;
    }
    else {

            $sqlu = "update account set balance= balance-'{$money}' WHERE  uid='{$uid}'";
            $resu = mysqli_query($dbc, $sqlu);
            $rowu = mysqli_fetch_array($resu);
            if ($resu == false) {
                echo -1;
            } 
            else {
         $sqlt = "update user_info set usertype='{$type}' WHERE telephone='{$uid}'";
         $rest = mysqli_query($dbc, $sqlt);
         $rowt = mysqli_fetch_array($rest);
          if ($rest == false) {
                     echo -2;
                 } else {

                echo 1;
        } 
              
            }




    }
}else {
echo -2;
}
?>
