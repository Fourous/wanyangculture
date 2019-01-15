<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/9/15
 * Time: 5:11
 */
    include "mysqli_connect.php";

if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $uid= $_POST['uid'];
    $sql="select * from comment_collect where uid = '{$uid}';";
    $query_res=mysqli_query($dbc,$sql);
    if($query_res){
        while($uidcomment = mysqli_fetch_array($query_res,MYSQLI_ASSOC)) $result[] = $uidcomment;
        echo json_encode($result);
    }else{
        $mes= "没有收藏任何书评！";
        echo json_encode($mes);
    }
}
?>