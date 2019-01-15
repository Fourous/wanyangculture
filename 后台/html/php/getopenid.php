<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/9/18
 * Time: 0:02
 */
include "mysqli_connect.php";

getopenid();
function getopenid(){
    $code= $_POST['code'];
    $url = "https://api.weixin.qq.com/sns/jscode2session?appid=wxf97feea057e28b44&secret=37ca5390ac03ca3bb25336254a422df3&js_code=$code&grant_type=authorization_code";
    $info = file_get_contents($url);//发送HTTPs请求并获取返回的数据，推荐使用curl
    $json = json_decode($info);//对json数据解码
    $arr = get_object_vars($json);
    $openid = $arr['openid'];
    $session_key = $arr['session_key'];
    $mes= array(
        $openid,$session_key
    );
    echo json_encode($mes);
}

?>

