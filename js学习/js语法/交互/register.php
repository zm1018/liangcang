<?php
header('content-type:text/html;charset="utf-8"');
$username = $_GET['username'];
$password = $_GET['password'];

$responseData = array("code"=>0,"message"=>"");

$link = new mysqli('127.0.0.1','root','888888','yyy',3308);
if(!$link) {
    $responseData['code'] = 1;
    $responseData['message'] = '数据库登录失败';
    echo json_encode($responseData);
    exit();
}

mysqli_set_charset($link,'utf8');

$sql = "insert into student(username,password,date) values('{$username}','{$password}','{$date}')";
$res = $link->query($sql);

if(!$res) {
    $responseData["code"] = 2;
    $responseData["message"] = "插入数据失败";
    echo json_encode($responseData);
} else {
    $responseData["message"] = "插入数据成功";
    echo json_encode($responseData);
}

$link->close();

?>