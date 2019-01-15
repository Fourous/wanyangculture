<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/9/14
 * Time: 18:59
 */

include ('mysqli_connect.php');
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $uid= $_POST['uid'];
    $col_uid= $_POST['col_uid'];
    $sql= "select * from person_col WHERE uid='{$uid}'AND col_uid='{$col_uid}'";
    $res= mysqli_query($dbc, $sql);
    $row= mysqli_fetch_array($res);
    if($row==false){
        $mes=0;
        echo json_encode($mes);
    }else{
        $mes=1;
        echo json_encode($mes);
    }

}
?>
