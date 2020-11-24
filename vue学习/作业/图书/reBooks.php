<?php
header('content-type:text/html;charset="utf-8"');
// 这个文件是修改图书的

// parse_str()将查询字符串解析成多个变量,存到第二个参数里
// parse_str(file_get_contents('php://input'),$data);
// var_dump($data);

$arr = json_decode(file_get_contents('php://input'),true);
$bname = $arr['bname'];
$id = $arr['id'];


$link = new mysqli('127.0.0.1','root','888888','books','3308');
if(!$link){
    echo '数据库连接失败';
    exit();
}
mysqli_set_charset($link,'uft8');

// 因为前台如果书名相同,直接禁掉button按钮,所以这里判断重复的代码都注释掉了
// 先查询书名相同的情况下,id是不是不同,如果id不同,表示用户输入的要修改的书名已存在,如果id相同,表示用户没做任何修改,因为数据库里id是主键,不会重复,所以id没变啥都没修改的可以提交
// $sql1 = "select * from book where bname='{$bname}' and id!={$id}";
// $res1 = $link->query($sql1);
// $row1 = $res1->fetch_assoc();
// if($row){
//     echo '书名重复,不能修改';
//     exit();
// }

$sql2 = "update book set bname='{$bname}' where id={$id}";
$res2 = $link->query($sql2);

if($res2){
    echo "修改图书成功";
    exit();
}

$link->close();
?>