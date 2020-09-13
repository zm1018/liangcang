<?php
header('content-type:text/html;charset="utf-8"');

$username = $_POST['username'];
$password = $_POST['password'];
$responseData = array('code'=>0,'message'=>'');

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
    $responseData['message'] = '数据库连接失败';
    echo json_encode($responseData);
    exit();
}

mysqli_set_charset($link,'utf8');

// 给密码加密
$str = md5(md5(md5($password).'xxx').'yyy');
// 验证用户名和密码是否存在,存在则输入正确,否则用户名或密码输入错误
$sql = "select * from users where username='{$username}' and password='{$str}'";
$res = $link->query($sql);
$row = $res->fetch_assoc();

if(!$row){
    $responseData['code'] = 4;
    $responseData['message'] = '用户名或密码错误';
    echo json_encode($responseData);
}else{
    $responseData['message'] = '登录成功';
    echo json_encode($responseData);
}

$link->close();
?>