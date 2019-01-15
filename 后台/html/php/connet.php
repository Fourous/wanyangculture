<?php

function sendMsg($msg,$host){

set_time_limit(0);

//$beats = "alive?";

//$sleep_time = 10;
$door = "01";
//$msg = "Re:open;Door:".$door;
$host = "127.0.0.1";
$port = 4099;

$socket = socket_create(AF_INET,SOCK_STREAM,SOL_TCP)or die("fail to create...");

socket_connect($socket,$host,$port)or die("fail to connect...");

socket_write($socket,$msg,strlen($msg))or die("fail to write...");

//$callback = socket_read($socket,1024)or die("fail to read...");

//echo $callback;

//while($socket){
	
//socket_write($socket,$beats,strlen($beats))or die("fail to write...");

$callback = socket_read($socket,1024)or die("fail to read...");

//return $callback;

//sleep($sleep_time);

if($callback=="sucess\0") 
{	
	socket_shutdown($socket);
	socket_close($socket);
	return TRUE;
	//break;
}
else return false;

//
//}

}
?>