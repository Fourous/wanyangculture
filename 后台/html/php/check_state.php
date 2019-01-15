<?php
include ('mysqli_connect.php');
if ($_SERVER["REQUEST_METHOD"] == "POST")
{

		$box = $_POST['box_id'];
		$door = $_POST['door_id'];
		$msg = '6A02'.$door.'EE';
		/*
		$client = socket_create(AF_INET,SOCK_STREAM,SOL_TCP)or die("fail to create..");
		socket_connect($client,'127.0.0.1',5678)or die("fail to connect...");
		$data = array('uid'=>$box,'msg'=>$msg);
		socket_write($client,json_encode($data))or die("fail to wtrite...");
		$callback = socket_read($client,8192)or die("fail to read...");
		*/
    $client = socket_create(AF_INET,SOCK_STREAM,SOL_TCP)or die("fail to create..");

    socket_connect($client,'127.0.0.1',5678)or die("fail to connect...");

    $data = array('uid'=>$box,'msg'=>$msg );

    socket_write($client,json_encode($data))or die("fail to wtrite...");

    $callback = socket_read($client,8192)or die("fail to read...");


		if($callback == 'ok'){
			echo 1;
		}
		else echo 0;
		}
		socket_close($client);
		mysqli_close($dbc);
?>
