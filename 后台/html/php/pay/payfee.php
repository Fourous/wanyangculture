<?php
include 'WeixinPay.php';
include('mysqli_connect.php');
//if ($_SERVER["REQUEST_METHOD"] == "POST"){
$appid='wxf97feea057e28b44';
$openid= $_POST['id'];
//$openid= 'oiJmG5HeYRxO8yOGgZRm_hkxegQg';
$mch_id='1502697491';
$key='Qbmupo8941132z3m7txcEv8P63fwVzTj';
$out_trade_no = $mch_id. time();
$total_fee = $_POST['fee'];
//$total_fee = '400';
$remote_ip = $_SERVER['REMOTE_ADDR'];
//$remote_ip = '192.168.0.1';
$telephone = $_POST['telephone'];//传入用户的id
$body = $_POST['body'];
$uid=$_POST['uid'];
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
	$weixinpay = new WeixinPay($appid,$openid,$mch_id,$key,$out_trade_no,$body,$total_fee,$remote_ip);
	if($return=$weixinpay->pay()) {
		echo json_encode($return);
	}

	
//}
?>
