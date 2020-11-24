<?php
header('content-type:text/html;charset="utf-8"');
// 这个是判断书名是否已存在的文件
// axios发送的get请求是form表单格式的字符串,可以直接通过$_GET获取数据
$bname = $_GET['bname']; //pname是查用户要新增的这个书名是否已存在
// $id = $_GET['id'];

$link = new mysqli('127.0.0.1', 'root', '888888', 'books', '3308');
if (!$link) {
    echo '连接失败';
    exit();
};

mysqli_set_charset($link,'utf8');


// 先从数据库里取数据,判断用户名是否重复,如果取出的书名和用户输入的书名相等,表示数据重复,不能新增
$sql1 = "select * from book where bname='{$bname}'";
$ret = $link->query($sql1);
$row = $ret->fetch_assoc();

if ($row) {
    echo "此书已存在";
    exit();
}

/* if($bname){
    $sql1 = "select * from book where bname='{$bname}'";
    $ret = $link->query($sql1);
    $row = $ret->fetch_assoc();

    if ($row) {
        echo "此书已存在";
        exit();
    }
} else if($id){
    $sql2 = "select * from book where id={$id}";
    $ret2 = $link->query($sql2);
    $row2 = $ret2->fetch_assoc();
    if ($row2) {
        // 把关联数组转换成对象,也就是json字符串
        echo json_encode($row2);
    }
} */

$link->close();
?>