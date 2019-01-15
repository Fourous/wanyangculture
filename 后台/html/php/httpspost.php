<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/9/15
 * Time: 6:47
 */

$js_code= $_POST['js_code'];
error_reporting(E_ALL || ~E_NOTICE);//报错屏蔽设置
date_default_timezone_set('PRC');//设置默认时区

$data_array["data"] = "{
    'appid': 'wxf97feea057e28b44',
    'secret': '37ca5390ac03ca3bb25336254a422df3',
    'js_code': '{$js_code}',
    'grant_type': 'authorization_code'
}";
$data = http_build_query($data_array);
$opts = array(
    'http'=>array(
        'method'=>"POST",
        'header'=>"Content-type: application/x-www-form-urlencoded\r\n".
            "Content-length:".strlen($data)."\r\n" .
            "Cookie: foo=bar\r\n" .
            "\r\n",
        'content' => $data,
    )
);
$cxContext = stream_context_create($opts);
$sFile = file_get_contents("https://api.weixin.qq.com/sns/jscode2session", false, $cxContext);

echo $sFile;
?>