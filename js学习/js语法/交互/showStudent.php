<?php
header('content-type:text/html;charset="utf-8"');
$link = new mysqli('127.0.0.1','root','888888','yyy','3308');
// $link = new mysqli('localhost','root','888888','yyy','3308'); //写localhost加载比127慢
if(!$link){
    echo '连接失败';
    exit();
}
mysqli_set_charset($link,'utf8');
$sql = 'select * from student';
$res = $link->query($sql);
// 
$arr = array();
while($row = $res->fetch_assoc()){
    array_push($arr,$row);
}
$str = json_encode($arr);
echo($str);
$res->free_result();
$link->close();
?>