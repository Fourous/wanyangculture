<?php
include 'WeixinPay.php';
include('mysqli_connect.php');
$appid='wxd54b1ed009906a5e';
$openid= $_POST['id'];
$mch_id='1502232571';
$key='huizho8941132z3m7txcEv8P63fwVzTj';
$out_trade_no = $mch_id. time();
$total_fee = $_POST['fee'];
$remote_ip = $_SERVER['REMOTE_ADDR'];
$body = $_POST['body'];
	$weixinpay = new WeixinPay($appid,$openid,$mch_id,$key,$out_trade_no,$body,$total_fee,$remote_ip);
	if($return=$weixinpay->pay()) {
		echo json_encode($return);
	}
?>
