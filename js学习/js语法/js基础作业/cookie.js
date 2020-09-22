// 设置cookie,可选参数不一定存在,所以通过解构的形式传入
function setCookie(name, value, { expires, path, domain, secure }) {
    // cookie名和值可能是中文,所以都通过编码来设置
    var cookieStr = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    // 判断有没有传入过期时间这个参数
    if (expires) {
        cookieStr += ';expires=' + afterOfDate(expires);
    }
    // 判断是否传入了path这个参数
    if (path) {
        cookieStr += ';path=' + path;
    }
    // 判断是否传入了域名
    if (domain) {
        cookieStr += ';domain=' + domain;
    }
    // 判断是否传入了指定https协议
    if (secure) {
        cookieStr += ';secure';
    }
    // 将拼接好的字符串赋值给document.cookie
    document.cookie = cookieStr;
}

function afterOfDate(n) {
    var d = new Date();
    var day = d.getDate()
    d.setDate(n + day);
    return d;
}

// 获取cookie
function getCookie(name) {
    // 获取全部cookie
    var cookieStr = decodeURIComponent(document.cookie);
    // 根据传入的键获取某一条cookie,获取传入的键所在的下标
    var start = cookieStr.indexOf(name + '=');
    //如果键不存在,返回null
    if (start == -1) {
        return null;
    } else {
        // 键存在,获取从start下标开始遇到的第一个;所在的下标位置,赋值给end
        var end = cookieStr.indexOf(';', start);
        // 如果;不存在,表示是最后一条cookie
        if (end == -1) {
            // 将这条cookie的长度赋值给end
            end = cookieStr.length;
        }
        // 截取字符串,从键的下标开始;的下标结束
        var str = cookieStr.substring(start, end);
        // 用=号分割字符串,返回一个数组,数组里有2个元素,键是第0个,值是第1个
        var arr = str.split('=');
        // 返回用户输入的键所对应的这个值
        return arr[1];
    }
}

// 删除cookie  
function removeCookie(name) {
    // 设置的时候是编码设置的,删除的时候也必需编码删除,不然传中文就找不到那个 已经编码的键;
    document.cookie = encodeURIComponent(name) + '=;expires=' + new Date(0);
}


// 将上面3个函数封装成1个函数,实现3个功能,三合一
/* 通过判断用户传入的参数个数来判断用户想使用哪种功能,
因为获取和删除都是只传一个参数,这里就强制规定删除cookie时需要再传一个参数null来区分与获取cookie的区别,
    设置cookie有两种可能:
        1.有两个参数,name,value,而且value不是null;
        2.有3个参数,name,value,{}
    获取cookie:
        只有一个参数name
    删除cookie:
        两个参数,name,null 

    这里name是确定的,3种方法都需要传,所以再封装的函数只先传一个参数name,另外两个参数不确定用户使用的功能需不需要传,就在函数体里调用函数时通过arguments获取
*/
function $cookie(name) {
    // 判断条件是arguments的长度
    switch (arguments.length) {
        // 如果arguments长度为1,说明只有一个参数name,表示用户想获取cookie
        case 1:
            return getCookie(name);
            break;
            // 如果arguments长度是2,有两种可能,再判断第2个参数是不是null
        case 2:
            if (arguments[1] == null) {
                // 是null表示用户想删除cookie
                return removeCookie(name);
            } else {
                // 否则是想设置cookie,这里setCookie函数有3个参数,即使用户只传2个,也必须写个空对象,否则报错
                return setCookie(name, arguments[1], {});
            }
            break;
        case 3:
            // 如果arguments长度是3,表示用户想设置cookie,那就将arguments的第3个参数也传进去
            return setCookie(name, arguments[1], arguments[2]);
            break;
        default:
            // 如果用户传超过 3个参数,就报错
            alert('参数传入超过规定长度');
            break;
    }
}