// 封装一个ajax请求下载数据的函数, 请求方式不确定,是否有数据传输不确定,请求的文件路径url不确定,下载到数据后怎么处理不确定,将不确定的值都作为参数传入
// 传参用{}解构的方式传参,可以不用按顺序传,这里还给method设置了一个默认值get,如果用户不传请求方式,就默认用get请求;
// 声明$ajax函数时的参数success和error是将用户传参时声明的函数赋值给变量success和error;
// 用户调用$ajax时传的函数参数是声明这两个回调函数;
// 函数$执行到数据下载成功返回给用户时,是调用success和error这两个函数;
// 参数data数据传对象类型;
function $ajax({ method = 'get', url, data, success, error }) {
    var xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch (error) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    // 判断数据是否存在,如果有数据传进来,就用querystring方法将数据处理成查询字符串格式,下面使用的data数据都是已经处理好的查询字符串;
    if (data) {
        data = querystring(data);
    }
    // 只有get请求并且有数据传输时才用?将url和查询字符串拼接,否则就算是get请求没有数据要传输,也不用拼接字符串到url后面;
    if (method == 'get' && data) {
        url += '?' + data;
    }
    // 调用open方法,如果是get,这里传的是刚上面一步处理过的url;
    xhr.open(method, url, true);
    // 如果是get请求,send方法不用传参
    if (method == 'get') {
        xhr.send();
    } else {
        // 如果是post请求,必需设置请求格式,并且给send传没有问号的查询字符串
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // 如何处理已经下载成功的数据不确定,所以使用回调函数,将如何处理数据的代码交给用户编写,但不是每次用户都会传回调函数这个参数,所以先判断一下回调函数是否存在,存在再执行回调函数,这里是调用 函数 传入实参;
                if (success) {
                    success(xhr.responseText);
                }
            } else {
                if (error) {
                    error('ERROR' + xhr.status);
                }
            }
        }
    }
}
// 将用户传入的对象类型的数据遍历处理,拼接成查询字符串样式的数据,返回,但每个键值对后面都有一个&符号,可请求时需要的参数最后结束的位置是不需要&符号的,所以需要将拼接号的数据通过substring方法处理,将最后一个下标的字符去掉,再返回处理好的字符串; 
function querystring(obj) {
    var str = '';
    for (var attr in obj) {
        str += attr + '=' + obj[attr] + '&';
    }
    return str.substring(0, str.length - 1);
}