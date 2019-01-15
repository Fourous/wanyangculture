<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/9/15
 * Time: 4:58
 */

include "mysqli_connect.php";

if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $uid= $_POST['uid'];
    $commentid= $_POST['commentid'];
    $time= time();
    $sql= "select * from comment_collect WHERE uid='{$uid}' AND commentid= '{$commentid}'";
    $res= mysqli_query($dbc, $sql);
    $row= mysqli_fetch_array($res);
    if($row){
        $sql1="delete from comment_collect WHERE uid='{$uid}' AND commentid= '{$commentid}'";
        $res1= mysqli_query($dbc, $sql1);
        if ($res1){
            $mes=0;
            echo json_encode($mes);
        }else{
            $mes=1;
            echo json_encode($mes);
        }
    }else{
        $sql2="insert into comment_collect(uid,commentid) VALUES('{$uid}','{$commentid}')";
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