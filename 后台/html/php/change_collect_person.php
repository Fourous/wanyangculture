<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/9/15
 * Time: 2:53
 */
    include "mysqli_connect.php";

    if ($_SERVER["REQUEST_METHOD"] == "POST"){
        $uid= $_POST['uid'];
        $col_uid= $_POST['col_uid'];
        $sql= "select * from person_col WHERE uid='{$uid}' AND col_uid= '{$col_uid}'";
        $res= mysqli_query($dbc, $sql);
        $row= mysqli_fetch_array($res);
        if($row){
            $sql1="delete from person_col WHERE uid='{$uid}' AND col_uid= '{$col_uid}'";
            $res1= mysqli_query($dbc, $sql1);
            if ($res1){
                $mes=0;
                echo json_encode($mes);
            }else{
                $mes=1;
                echo json_encode($mes);
            }
        }else{
            $sql2="insert into person_col(uid,col_uid) VALUES('{$uid}','{$col_uid}')";
            $res2= mysqli_query($dbc, $sql2);
            if ($res2){
                $mes=2;
                echo json_encode($mes);
            }else{
                $mes=3;
                echo json_encode($mes);
            }
        }
    }
?>
