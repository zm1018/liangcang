<?php
header('content-type:text/html;charset="utf-8"');

$id = $_GET['id'];

$link = new mysqli('127.0.0.1','root','888888','books','3308');
if(!$link){
    echo '数据库连接失败';
    exit();
}

mysqli_set_charset($link,'utf8');

$sql = "delete from book where id={$id}";
$res = $link->query($sql);

if($res){
    echo '删除图书成功';
    exit();
}

$link->close();

?>