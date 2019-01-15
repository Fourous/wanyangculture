<?php
include "mysqli_connect.php";
$uid= $_POST['uid'];
$sqlr= "select * from lend_record WHERE lend_date is NOT NULL and return_date is NOT NULL AND uid='{$uid}' AND ispay=0";
$resr= mysqli_query($dbc, $sqlr);
$row_num= mysqli_num_rows($resr);
if($row_num > 0){
    echo 1;
}else{
  echo 0;
}
?>
