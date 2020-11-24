<?php
header('content-type:text/html;charset="utf-8"');
// 这个是通过id查出用户要修改的这条数据,将数据返回给前台的文件
// axios发送的get请求是form表单格式的字符串,可以直接通过$_GET获取数据
$id = $_GET['id']; //id是查出用户要修改的这条数据,渲染到input框里

$link = new mysqli('127.0.0.1', 'root', '888888', 'books', '3308');
if (!$link) {
    echo '连接失败';
    exit();
};

mysqli_set_charset($link,'utf8');

$sql2 = "select * from book where id={$id}";
$ret2 = $link->query($sql2);
$row2 = $ret2->fetch_assoc();
if($row2){
    // 把关联数组转换成对象,也就是json字符串
    echo json_encode($row2);
}

$link->close();
