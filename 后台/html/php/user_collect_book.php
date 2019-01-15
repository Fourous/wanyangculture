<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/9/14
 * Time: 22:24
 */
include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $uid= $_POST['uid'];
    $bookid= $_POST['bookid'];
    $sql= "select * from book_collection WHERE uid='{$uid}' AND bookid='{$bookid}'";

    $res= mysqli_query($dbc,$sql);
	$row=mysqli_fetch_array($res);
    if ($row){
        $mes=1;
        echo json_encode($mes);
    }else{
        $mes=0;
        echo json_encode($mes);
    }
}
?>
