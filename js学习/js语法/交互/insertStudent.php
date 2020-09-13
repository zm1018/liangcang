<?php
header('content-type:text/html;charset="utf-8"');
// 往数据库增加数据
// 必需要有数据提交过来再加载php页面才会成功,否则因为没有值而报错;
$uname = $_POST['name'];
$math = $_POST['math'];
$english = $_POST['english'];
$chinese = $_POST['chinese'];

// 设置一个数据库连接成功或失败的返回格式,便于前后端交互
$responseData = array("code"=>0,"message"=>"");

$link = new mysqli('127.0.0.1','root','888888','yyy','3308');
if(!$link) {
    $responseData["code"] = 1;
    $responseData["message"] = "数据库连接失败";
    echo json_encode($responseData);
    exit();
}

mysqli_set_charset($link,'uft8');

$sql = "insert into student(name,math,english,chinese) values('{$uname}',{$math},{$english},{$chinese})";

$res = $link->query($sql);  //返回值是布尔值

if(!$res) {
    $responseData["code"] = 2;
    $responseData["message"] = "插入数据失败";
    echo json_encode($responseData);
}else{
    $responseData["message"] = "插入数据成功";
    echo json_encode($responseData);
}
$link->close();


?>