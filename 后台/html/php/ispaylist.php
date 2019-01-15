<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/9/23
 * Time: 7:34
 */
include "mysqli_connect.php";

$uid =$_POST['uid'];
$sql= "select * from lend_record WHERE uid='{$uid}' and ispay=1";
$res= mysqli_query($dbc, $sql);
$row= mysqli_fetch_array($res);
if ($row==false){
    echo -1;
}else{
    $result= array();
    do{
     $list= array(
         $row[0],$row[1],$row[2],$row[3],$row[4],$row[5]
     );
     array_push($result, $list);
    }while($row= mysqli_fetch_array($res));
    echo json_encode($result);
}


?>