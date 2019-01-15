<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/10/9
 * Time: 15:15
 */
include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $uid = $_POST['uid'];
    $time= time();
    $sql = "insert into user_share 
	set uid = '{$uid}',
		share_time = '{$time}'
		;";
    $res = mysqli_query($dbc,$sql);
    if($res){
        $sql1= "select * from user_share WHERE uid='{$uid}' and share_time ='{$time}'";
        $res1= mysqli_query($dbc,$sql1);
        $row= mysqli_fetch_array($res1);
        if ($row==false){
            $mes="meiyoushuju";
            echo json_encode($mes);
        }else{
            $mes= $row[1];
            echo json_encode($mes);
        }
    }
    else echo 0;
}
mysqli_close($dbc);
?>
