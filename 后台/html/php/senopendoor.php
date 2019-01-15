  <?php
  $client = socket_create(AF_INET,SOCK_STREAM,SOL_TCP)or die("fail to create..");
  
  socket_connect($client,'127.0.0.1',5678)or die("fail to connect...");
  
  $data = array('uid'=>'01','msg'=>'6A010112345678910EE');
  
  socket_write($client,json_encode($data))or die("fail to wtrite...");
  
  $callback = socket_read($client,8192)or die("fail to read...");
  
  echo $callback;
  ?>

