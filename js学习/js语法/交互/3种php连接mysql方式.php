<?php
header('content-type:text/html;charset="utf-8"');
// 1.通过mysql_connect()连接数据库,这个方法废弃了,php5.0以上的版本不能用,参数3个: 连接数据库的域名或ip,登录数据库的用户名,密码; 返回值是true连接成功,false连接失败;
// $link = mysql_connect('localhost', 'root', 'My@_19My');

// 连接mysql数据库共3种方式,mysqli面向对象/面向过程,这2种只能给mysql数据库用,PDO面向对象支持很多数据库:

$server = 'localhost';  //ip
$username = 'root';     //用户名
$password = 'My@_19My'; //密码
$dbname = 'yyy';        //连接哪个数据库的数据库名字
$port = 3307;   //端口号,默认3306

/* // 第一种:面向对象连接mysql数据库,共8步:
// 1.用mysqli构造函数创建一个连接mysql的实例对象
$conn = new mysqli($server,$username,$password,$dbname,$port);
// var_dump($conn);  //查看构造函数的返回值,是一个mysqli对象:object(mysqli)#1 (0) { }

// 2.判断数据库是否链接成功,调用实例对象的connect_error属性返回错误信息;
if($conn->connect_errno) {
    die( '链接失败:'.$conn->connect_errno);   //die()方法输出一条错误信息,并退出当前程序
    // exit(); //和die()一样的作用;
}
echo '连接成功';
// mysqli_select_db($conn,$dbname); //更改连接的默认数据库

// 3.设置默认客户端字符集,也就是编码格式,必需写,否则中文都不识别,乱码,写了解决乱码问题
mysqli_set_charset($conn,'utf8');
mysqli_query($conn, "set names utf8"); //设置数据库编码格式

// 4.写mysql的语句,查询student表的所有数据
$sql = 'select * from student';

// 5.发送sql语句,通过实例对象的query方法,返回值就是获得的student表的所有数据,是一个对象类型;
$result = $conn->query($sql);
// var_dump($result);  //返回一个mysqli结果对象,不能直接操作,object(mysqli_result)#2 (0) { }
// mysqli_num_rows()方法查看返回数据的行数,也就是有几条数据
echo mysqli_num_rows($result); //返回 4条数据

// 6.将返回的mysqli结果对象处理成我们能看到数据的关联数组,网页崩溃了,换phpsduty集成环境都可以用了
// $row = mysqli_fetch_assoc($result); //转成关联数组用不了,网页都崩溃了
// $row = $result->fetch_assoc(); //转成关联数组用不了,网页都崩溃了
// $row = mysqli_fetch_array($result,MYSQLI_ASSOC); //用fetch_array传关联数组参数也不行
// $row = $result->fetch_array(MYSQLI_ASSOC); //这种用结果对象调用也不行
// $row = $result->fetch_array(MYSQLI_BOTH); //这种传both也不行,both就是两种数组都行
// 关联数组取值用对象的取值格式写
// echo 'id' . $dat['id'] . 'name:' . $dat['name'] . '数学成绩:' . $dat['math'] . '英语成绩:' . $dat['english'] . '语文成绩:' . $dat['chinese'] . '<br>';

// // 将返回的mysqli结果对象处理成我们能看到数据的索引数组,调用一次执行一行数据,
// $row = mysqli_fetch_row($result);
// $row = $result->fetch_row(); //调用了2次,这里输出第2条数据,页面上只有这一条数据
// $row = $result->fetch_array(MYSQLI_NUM); //调用了3次,这里输出第3条数据,页面上只有这一条数据
// var_dump($row); 
// // 索引数组取值
// echo 'id'.$dat[0].'name:'.$dat[1].'数学成绩:'.$dat[2].'英语成绩:'.$dat[3].'语文成绩:'.$dat[4].'<br>';

// 如果取出全部数据需要循环,但不知道数据库一共多少条数据,所以用where循环,取出数据返回null时,就是false,执行循环的条件不满足,就会退出循环;
// 判断query()方法获取的数据是大于0条的;
if(mysqli_num_rows($result) > 0) {
    while($dat = $result->fetch_row()) {
        // var_dump($dat);
        echo '<br>id:'.$dat[0].',名字:'.$dat[1].',数学成绩:'.$dat[2].',英语成绩:'.$dat[3].',语文成绩:'.$dat[4].'<br>';
    }
} else {
    echo '暂无数据';
}

// 7.释放结果集,也就是关闭结果对象
$result->free_result();
// 关闭mysql数据库
$conn->close(); */




/* //  第二种,mysqli面向过程,方法和属性都要通过mysqli调用
$link = mysqli_connect($server,$username,$password,$dbname,$port);

if(!$link) {
    die('连接失败:'.mysqli_connect_errno());
    // exit();
}
echo '连接成功';

mysqli_set_charset($link,'utf8');

$sql2 = 'update student set math=90 where id=1';
$row = mysqli_query($link,$sql2); //修改id为1的学生的数学成绩
echo $row; //exec方法的返回值是修改的条数

$sql = 'select * from student';

$res = mysqli_query($link,$sql);

while($dat = mysqli_fetch_assoc($res)){
    // echo '<br>id:'.$dat[0].',名字:'.$dat[1].',数学成绩:'.$dat[2].',英语成绩:'.$dat[3].',语文成绩:'.$dat[4].'<br>';
    echo '<br>id:' . $dat['id'] . ',name:' . $dat['name'] . '数学成绩:' . $dat['math'] . '英语成绩:' . $dat['english'] . '语文成绩:' . $dat['chinese'] . '<br>';
};

mysqli_free_result($res);

mysqli_close($link);
 */


//  第三种,PDO连接,连接时必须指定数据库名,否则报错
// PDO的第一个参数是 数据库类型:主机名/端口/数据库名,这个数据库类型可以指定各种数据库,比如sqlite;

try{
    $link = new PDO('mysql:host=localhost;port=3307;dbname=yyy;charset=utf8',$username,$password,array(PDO::ATTR_PERSISTENT => true)); //这个是连mysql端口是3307的
    // $link = new PDO('mysql:host=localhost;dbname=gp1lianxi1;charset=utf8',$username,$password, array(PDO::ATTR_PERSISTENT => true)); //这个array里写的是长连接,这个mysql没加端口是连3306的那个;
    // var_dump($link);
    echo '连接成功';
    $row = $link->exec('update student set math=90 where id=1'); //修改id为1的学生的数学成绩
    echo $row; //exec方法的返回值是修改的条数

    // 设置sql语句
    // $sql = 'select * from zuoye1_dianying';
    $sql2 = 'select * from student';

    // 用foreach循环获取student表的所有数据,并赋值给$dat变量,变量的返回值是关联数组类型
    foreach ($link->query($sql2) as $dat) {
        // print_r($dat); //输出关联数组
        echo '<br>id:' . $dat['id'] . 'name:' . $dat['name'] . '数学成绩:' . $dat['math'] . '英语成绩:' . $dat['english'] . '语文成绩:' . $dat['chinese'] . '<br>';
    }
    
    $link = null; //关闭数据库连接
} catch (PDOException $e) {
    // $link->rollBack();//错误回滚 
    // 输出错误信息
    echo $e->getMessage();
}

// query()能用了,这是从pdo剪出来的不需要的代码
    // $link->beginTransaction();//开启事务
    // $res = $link->query($sql); //query获取不到数据,解决不了,换成PHPstudy开发环境就好了
    // $res = $link->prepare($sql); //prepare可以获取到,用这个方法增删改查都可以
    // var_dump($res);
    // $row = $res->fetch(PDO::FETCH_BOTH); //获取一条数据
    // $row = $res->fetchAll(PDO::FETCH_ASSOC); //获取所有数据
    // $row = $res->fetchAll(PDO::FETCH_NUM); //获取所有数据
    // $row = $res->fetchAll(PDO::FETCH_OBJ); //fetch()则返回对象，fetchall(),返回由对象组成的二维数组
    // var_dump($row);
    // $link->commit();//提交事务
    // 捕捉错误
    // $link->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
    //添加数据
    // $row1 = $link->exec("insert into 表名(字段) values(值)");
    //  exec主要执行没有返回结果集的操作 PDO::exec执行一条SQL语句，并返回受影响的行数。此函数不会返回结果集合.。 （exec用于insert、delete、update）


    //修改数据
    // $row2 = $link->exec("update 表名 set 字段 = '新值' where 字段 = 值");


    //删除数据
    // $row3 = $link->exec("delete from  表名 where 字段 = 值");


?>
