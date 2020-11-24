<?php
header('content-type:text/html,charset="utf-8"');
$link = new mysqli('127.0.0.1','root','888888','yyy','3308');

if(!$link){
    echo '数据库连接失败';
    exit();
}

mysqli_set_charset($link,'utf8');

$sql = 'select * from user';
$res = $link->query($sql);

$arr = array();
if(mysqli_num_rows($res) > 0) {
    while($data = $res->fetch_assoc()){
        array_push($arr,$data);
    }
}

$str = json_encode($arr);
echo($str);

$res->free_result();
$link->close();
?>