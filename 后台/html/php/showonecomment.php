<?php
include "mysqli_connect.php";

$commentid =$_POST['id'];
$sql= "select * from book_comment WHERE commentid='{$commentid}'";
$res= mysqli_query($dbc, $sql);
$row= mysqli_fetch_array($res);
if ($row==false){
    echo -1;
}else{
    echo json_encode($row[1]);
}
?>
