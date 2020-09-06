<?php
    // 不支持中文,所以要设置编码方式
    header('content-type:text/html;charset="utf-8"');
    // 输出函数, 会自动解析标签和样式,但不会自动换行,要用<br/>标签换行
    echo '<h1 style="color:red;">hello word</h1>';
    print_r('<h1>hello word</h1>');
    var_dump('<h1>hello word</h1>'); //得到string(19) "hello word",字符串类型,长度19个字符,

    // 声明变量,用$
    $age = 18;  
    $name = "小花";

    // 拼接字符串,用.或{}
    echo "我是".$name."我今年".$age."岁了<br/>";
    echo "我是{$name}我今年{$age}岁了<br/>";

    print("我是{$name}我今年{$age}岁了<br/>");
    var_dump("我是{$name}我今年{$age}岁了");  // 有中文一个字3个字符长
    var_dump($age); // 得到int(18),整数类型,值是18;
    $num = 6.8;
    var_dump($num); // 得到 float(6.8),浮点数类型,值是6.8;
    
    // 分支语句判断
    $a = 2;
    $b = 3;
    if($a + $b = 5) {
        echo "5<br/>";
    } else {
        echo "你算错了";
    }

    $n = 6;
    switch($n - $a) {
        case 2:
            echo 2;
            break;
        case 5:
            echo 5;
            break;
        default:
            echo 4;
            break;
    }
    
    // 循环
    for($i = 0; $i < 5; $i++) {
        echo "第{$i}次循环,下标是{$i}";
    } 

    // 声明函数
    function p() {
        print "<br/>hello word <br/>";
    }
    // 调用函数
    p();
    p();

    // 声明索引数组
    $arr1 = array("张三","李四","王二");

    // 输出数组详情
    var_dump($arr1); // 得到array(3) { [0]=> string(6) "张三" [1]=> string(6) "李四" [2]=> string(6) "王二" } 

    // 输出数组下标为2的元素
    echo $arr1[2]; //得到 王二

    // 输出数组的长度
    echo count($arr1); // 得到3

    // 遍历数组
    for($i = 0; $i < count($arr1); $i++) {
        echo "<br/>数组第{$i}个元素的下标是:{$i},元素是:{$arr1[$i]}<br/>";
    }


    // 声明关联数组
    $arr2 = array("张三" => "打鱼的","李四" => "种地的","王二" => 666);

    // 输出数组
    var_dump($arr2);

    // 取出数组键为 李四 的元素的值
    echo $arr2["李四"];

    // 遍历数组
    foreach($arr2 as $key => $value){
        echo "<br/>键是:{$key},值是:{$value}<br/>";
    }

    // 多维数组,也就是嵌套
    $arr3 = array(
        array("name"=> "小白","math" => 80),
        array("姓名","成绩")
    );

    // 输出数组
    var_dump($arr3);

    // 取出数组下标为0的name元素的值
    echo $arr3[0]["name"];
    // 取出数组下标为1的数组中下标为0的元素
    echo $arr3[1][0];
    
    // 内置数组方法:
    // 取出关联数组的所有键,返回值是数组,键是数组的元素;
    print_r(array_keys($arr2));
    var_dump(array_keys($arr2));
    //这几种只能输出Array类型,无法输出每个键的详细信息
    // echo(array_keys($arr2));
    // echo array_keys($arr2);
    // print array_keys($arr2); 

    // 取出指定值对应的键
    print_r(array_keys($arr2,"打鱼的")); //得到( [0] => 张三 )

?>