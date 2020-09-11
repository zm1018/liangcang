<?php
header('content-type:text/html;charset="utf-8"');
// 后台下载数据到前台使用:
$news = array(
    array('title'=> '布克与詹娜约会用餐 詹娜一袭紧身吊带裙超迷人','date'=> '09-07'),
    array('title'=> '太甜了！刘诗诗朱一龙新剧开播 19秒吻戏狂虐单身狗','date'=> '09-07'),
    array('title'=> '90小花同场比美！虞书欣红发斜肩裙美艳 鞠婧祎黑皮衣酷飒','date'=> '09-07'),
    array('title'=> '[欧国联]荷兰0-1意大利','date'=> '09-07'),
    array('title'=> '机器人中医“坐诊”服贸会','date'=> '09-07'),
    array('title'=> '场均5分之人却拥有NBA最美太太 这颜值身材太爆炸了','date'=> '09-07'),
    array('title'=> '扶贫车间里建托管所 上班带娃两不误','date'=> '09-07'),
);

// json_encode是后端将数组转成json格式的字符串的方法
echo json_encode($news);
/* 
得到的json格式的字符串,都是二进制数,将原来的数据结构用''引起来,可以很明显看出原来的数据格式是[]包裹的,是数组,
分析数据结构:将数据复制到网上的json美化工具,就能解析成能阅读的数据;
'[{"title":"\u5e03\u514b\u4e0e\u8a79\u5a1c\u7ea6\u4f1a\u7528\u9910 \u8a79\u5a1c\u4e00\u88ad\u7d27\u8eab\u540a\u5e26\u88d9\u8d85\u8ff7\u4eba","date":"09-07"},{"title":"\u592a\u751c\u4e86\uff01\u5218\u8bd7\u8bd7\u6731\u4e00\u9f99\u65b0\u5267\u5f00\u64ad 19\u79d2\u543b\u620f\u72c2\u8650\u5355\u8eab\u72d7","date":"09-07"},{"title":"90\u5c0f\u82b1\u540c\u573a\u6bd4\u7f8e\uff01\u865e\u4e66\u6b23\u7ea2\u53d1\u659c\u80a9\u88d9\u7f8e\u8273 \u97a0\u5a67\u794e\u9ed1\u76ae\u8863\u9177\u98d2","date":"09-07"},{"title":"[\u6b27\u56fd\u8054]\u8377\u51700-1\u610f\u5927\u5229","date":"09-07"},{"title":"\u673a\u5668\u4eba\u4e2d\u533b\u201c\u5750\u8bca\u201d\u670d\u8d38\u4f1a","date":"09-07"},{"title":"\u573a\u57475\u5206\u4e4b\u4eba\u5374\u62e5\u6709NBA\u6700\u7f8e\u592a\u592a \u8fd9\u989c\u503c\u8eab\u6750\u592a\u7206\u70b8\u4e86","date":"09-07"},{"title":"\u6276\u8d2b\u8f66\u95f4\u91cc\u5efa\u6258\u7ba1\u6240 \u4e0a\u73ed\u5e26\u5a03\u4e24\u4e0d\u8bef","date":"09-07"}]'
*/

?>