<?php
include ('mysqli_connect.php');
if ($_SERVER["REQUEST_METHOD"] == "POST")
{

		$uid = $_POST['uid'];
		$box = $_POST['box_id'];
		$door = $_POST['door_id'];
		$msg = '6A01'.$door.$uid.'EE';
		$client = socket_create(AF_INET,SOCK_STREAM,SOL_TCP)or die("fail to create..");

		socket_connect($client,'127.0.0.1',5678)or die("fail to connect...");
	
		$data = array('uid'=>$box,'msg'=>$msg);

		socket_write($client,json_encode($data))or die("fail to wtrite...");
		
		/*while(!empty($callback))*/
/*		{*/
        $callback = socket_read($client,8192)or die("fail to read...");
		
/*		if($callback == 'ok'){*/
        $sql = "update book_box set cpdstate = 0 where boxid = {$box} and cpdid = {$door};";
        $resa=mysqli_query($dbc,$sql);
        if($resa){
            $sqlbook= "select * from lend_record ORDER BY lend_date DESC WHERE return_date=NULL ";
            $resbook= mysqli_query($dbc, $sqlbook);
            $rowbook= mysqli_fetch_array($resbook);
            $bookid= $rowbook[1];
            $sqldebook= "delete from book_box WHERE bookid='{$bookid}'";
            $resdebook= mysqli_query($dbc, $sqldebook);
            $rowdebook= mysqli_fetch_array($resdebook);
            if ($rowdebook){
                echo 1;
            }
        }
/*			else echo 2;
		}
		else echo 0;

		}*/
socket_close($client);
}
mysqli_close($dbc);
?>
