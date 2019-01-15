<?php

//判断注册的电话号码是否合法
function check_phone($phone){
	if(!preg_match("/^1[34578]{1}\d{9}$/",$phone)){  
		return false;
	}else{  
		return true; 
	}  
}

//判断密码长度是否大于6并且小于16
function check_password($password){
	if(strlen($password)<6||strlen($password)>16){
		return false;
	}else{
		return true;
	}
}


