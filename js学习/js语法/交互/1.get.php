<?php
header('content-type:text/html;charset="utf-8"');
// 接收页面提交来的数据
$username = $_GET['username'];
$age = $_GET['age'];
$password = $_GET['password'];

// 将接收的数据输出
echo "你的名字:{$username},年龄:{$age},密码:{$password}";
?>