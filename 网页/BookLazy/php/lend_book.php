<?php


include ('mysqli_connect.php');


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$act = $_POST['id'];
	if($getid == "lendbook"){
	$Suid = $_POST['uid'];
	$uid = intval($Suid);
	$Sbookid = $_POST['bookid'];
	$bookid = intval($Sbookid);
	$sql = "insert into lend_record set uid = {$uid},bookid = {$bookid},lend_date = unix_timestamp(now());";
	$result = mysqli_query($dbc,$sql);
		if($result){
			$sqlii = "update book set lend_count = lend_count + 1 where bookid = {$bookid};";
				if(mysqli_query($dbc,$sqlii)){
					echo "借书成功！";
				}
		}
	}

}

mysqli_close($dbc);
?>
