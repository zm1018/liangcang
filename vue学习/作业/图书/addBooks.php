<?php
header('content-type:text/html;charset="utf-8"');
// 这个是新增图书的文件
// id和日期都是数据库自动生成的,这里只需要接收前台传过来的图书名,传来的是json格式字符串,直接用post获取不到,要用读取文件,强制转换成数组的方式获取到post的参数
$arr = json_decode(file_get_contents('php://input'),true);
$bname = $arr['bname'];

$link = new mysqli('127.0.0.1','root','888888','books','3308');
if(!$link){
    echo '连接失败';
    exit();
};

mysqli_set_charset($link,'utf8');

// 侦听器发送的get请求那个文件是来判断书名是否存在的,如果书名不存在,把这个文件post提交过来的参数通过关联数组取出来的书名,作为键的值传给后台
$sql2 = "insert into book(bname) values('{$bname}')";
$res = $link->query($sql2);

if(!$res){
    echo '新增图书失败';
}else{
    echo "新增图书成功";
}


$link->close();


?>