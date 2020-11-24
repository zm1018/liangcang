<?php
header('content-type:text/html;charset="utf-8"');
$responseData = array("code"=>0,"message"=>"");

$username = $_POST['username'];
$password = $_POST['password'];
$date =  $_POST['date'];

// 这里的表单验证,是因为前端即使验证过,在网络传输过程中,可能出问题,所以必须在后台也进行验证
// 判断用户密码是否为空
if(!$username) {
    $responseData['code'] = 1;
    $responseData['message'] = '用户名不能为空';
    echo json_encode($responseData);
    exit();
}

if(!$password) {
    $responseData['code'] = 2;
    $responseData['message'] = '密码不能为空';
    echo json_encode($responseData);
    exit();
}

$link = new mysqli('127.0.0.1','root','888888','yyy',3308);

if(!$link) {
    $responseData['code'] = 3;
    $responseData['message'] = '数据库登录失败';
    echo json_encode($responseData);
    exit();
}

mysqli_set_charset($link,'utf8');

// 判断用户输入的用户名是否重复,从数据库里取数据,取的数据值是和用户输入的用户名一样的
$sql1 = "select * from users where username='{$username}'";
$res = $link->query($sql1);
$row = $res->fetch_assoc();
// 如果if语句为true,表示用户名重复
if($row) {
    $responseData['code'] = 4;
    $responseData['message'] = '用户名重复';
    echo json_encode($responseData);
    exit();
}

// 进行密码用md5()加密,可以加密多层
$str = md5(md5(md5($password).'xxx').'yyy');
// 将新增数据存到数据库里
$sql2 = "insert into users(username,password,date) values('{$username}','{$str}',{$date})";

$res = $link->query($sql2);

if(!$res) {
    $responseData["code"] = 5;
    $responseData["message"] = "注册失败";
    echo json_encode($responseData);
} else {
    $responseData["message"] = "注册成功";
    echo json_encode($responseData);
}

$link->close();

?>