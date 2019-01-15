<?php
/**
 * Created by PhpStorm.
 * User: 貔貅卡
 * Date: 2018/10/12
 * Time: 23:43
 */

include "mysqli_connect.php";

$uid= $_POST['uid'];

$sqlusertype= "select usertype from user_info WHERE telephone='{$uid}'";
$resusertype= mysqli_query($dbc, $resusertype);
$rowusertype= mysqli_fetch_array($resusertype);
$usertype= intval($rowusertype['usertype']);

$sqlrecord= "select * from lend_record WHERE uid='{$uid}' and lend_date is NOT NULL and return_date is NOT NULL and ispay=0";
$resrecord= mysqli_query($dbc, $sqlrecord);
$rowrecord= mysqli_fetch_array($resrecord);

if ($rowrecord== false){
    return 0;
}else{
    do{
        $bookid= $rowrecord['bookid'];
        $lend_date= intval($rowrecord['lend_date']);
        $return_date= intval($rowrecord['return_date']);

        $sqlbooktype="select type from book WHERE bookid='{$bookid}'";
        $res_book= mysqli_query($dbc, $sqlbooktype);
        $row_book= mysqli_fetch_array($res_book);
        $booktype= $row_book['type'];

        $bookmoney=0;
        switch ($booktype){
            case "漫画绘本":$bookmoney=1;break;
            case "杂志": $bookmoney=2;break;
            case "畅销书": $bookmoney=3;break;
            case "系列小说": $bookmoney=4;break;
        }
        $day= ceil(($return_date- $lend_date)/86400);
        $pay= 0;
        if($usertype==4 || $usertype== 3){
		    $pay=0;
        }else if($usertype== 2 || $usertype== 1){
            if($bookmoney== 2){
                $pay=0;
            }else{
                $pay=$bookmoney*$day;
            }
        }else{
            $pay= $bookmoney*$day;
        }
        $sqlmoney= "update lend_record set pay='{$pay}' WHERE uid='{$uid}' AND bookid='{$bookid}'";
        $resmoney= mysqli_query($dbc, $sqlmoney);
       // $sqlrem="update account set balance=balance-'{$pay}' WHERE uid='{$uid}'";
       // $resrem= mysqli_query($dbc, $sqlrem);
        if ($resrem== false){
            echo -1;
        }
    }while($rowrecord= mysqli_fetch_array($resrecord));
    echo 1;
}

?>
