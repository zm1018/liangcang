<?php
header('content-type:text/html;charset="utf8"');
$responseData = array("code" => 0, "message" => "");

$id = $_GET['id'];

$link = new mysqli('127.0.0.1', 'root', '888888', 'yyy', '3308');
if(!$link) {
    $responseData["code"] = 1;
    $responseData["message"] = "数据库连接失败";
    echo json_encode($responseData);
    exit();
}

mysqli_set_charset($link,'utf8');

$sql2 = "delete from users where id={$id}";
$res = $link->query($sql2);

if(!$res) {
    $responseData["code"] = 2;
    $responseData["message"] = "删除失败";
    echo json_encode($responseData);
}else{
    $responseData["message"] = "删除成功";
    echo json_encode($responseData);
}

$link->close();
?>