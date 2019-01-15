<?php

require_once 'vendor/autoload.php';

$db = new Workerman\MySQL\Connection('localhost','3306','root','wanyangwenhua','WY');

$sql="select cpdstate from book_box where boxid = 1 and cpdid = 2;";

$row_count = $db->query($sql);

var_dump($row_count);
?>