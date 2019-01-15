<?php
include 'WeixinRefund.php';
include('mysqli_connect.php');
if ($_SERVER["REQUEST_METHOD"] == "POST"){
//$appid='wxf97feea057e28b44';
$openid= $_POST['id'];//openid
//$openid= 'oiJmG5HeYRxO8yOGgZRm_hkxegQg';
$mch_id='1502697491';
$outRefundNo = $mch_id. time();
$refundFee = $_POST['fee'];//退款金额，应该和充值押金一样
$outTradeNo = $_POST['trade_no'];//支付时订单号（微信有消息会给）

$totalFee = $refundFee;
//$total_fee = '400';
//$remote_ip = $_SERVER['REMOTE_ADDR'];
//$remote_ip = '192.168.0.1';
$telephone = $_POST['telephone'];//传入用户的id
//$body = $_POST['body'];
//$body = '充值押金';
//$telephone = '13247213178';
/*
$sql_user = "SELECT * FROM user_info WHERE telephone = {$telephone};";
$result_user = mysqli_query($dbc,$sql_user);
*/
//if(mysqli_num_rows($result_user)>0){
/*	if(empty($total_fee)) //押金
	{
		$body = "充值押金";
		$total_fee = floatval(99*100);
		$sql = "INSERT INTO account('deposit') VALUES ('{$total_fee}') WHERE uid = {$telephone}";
		mysqli_query($dbc,$sql);
	}
	 else {
		 $body = "充值余额";
		 $total_fee = floatval($total_fee*100);
		 $sql_balance ="INSERT INTO account('balance') VALUES ('{$total_fee}') WHERE uid = {$telephone}";
		 mysqli_query($dbc,$sql_balance);
	 }
	*/
	$weixinRefund = new WeixinRefund($openid,$outTradeNo,$totalFee,$outRefundNo,$refundFee);
	if($return=$weixinRefund->refund()) {
		$sql = "update account set deposit = 0 where uid = {$telephone};";
		mysqli_query($dbc,$sql);
		echo json_encode($return);	
	}
	
}
?>