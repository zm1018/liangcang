// 因为通过getElementByClassName()获取节点有兼容性问题,所以自己封装一个没有兼容性问题,但功能一样的函数.
// 参数node表示从哪个标签开始获取,
// 参数classStr表示获取哪个标签,
function elementsByClassName(node, classStr) {
    var nodes = node.getElementsByTagName('*'),
        arr = [];
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].className === classStr) {
            arr.push(nodes[i]);
        }
    }
    return arr;
}


// 完美运动,可以实现任何元素同时多样式运动;
function startMove(node, cssObj, complete) {
    clearInterval(node.timer);

    node.timer = setInterval(function() {
        // 声明一个变量,假设所有动画都运动完毕了,值为true;
        var isEnd = true;
        for (var attr in cssObj) {
            // 终点值,是传入的css样式要运动到目的的属性值;
            var iTarget = cssObj[attr];
            // 当前值，是获取元素的css样式，是没运动前的样式属性值；
            var iCur = null;
            if (attr == 'opacity') {
                iCur = parseInt(parseFloat(getStyle(node, attr)) * 100);
            } else {
                iCur = parseInt(getStyle(node, attr));
            }
            // 速度,以什么样的速度运动
            var speed = (iTarget - iCur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            // 运动
            if (attr == 'opacity') {
                iCur += speed;
                node.style.opacity = iCur / 100;
                node.style.filter = `alpha(opacity=${iCur})`;
            } else {
                node.style[attr] = iCur + speed + 'px';
            }
            // 判断是否所有运动都执行完了,有一个没执行完就返回false
            if (iCur != iTarget) {
                isEnd = false;
            }
        }

        // 执行这里的代码就表示所有动画都执行完了,关闭定时器,要写在for循环外面
        if (isEnd) {
            clearInterval(node.timer);
            if (complete) {
                complete.call(node);
            }
        }
    }, 30)
}



// 获取css样式,封装一个跨浏览器获取内部或外部css样式的函数,返回字符串类型的结果;
// node表示变量名(标签),是获取到的标签赋值给变量
// cssStyle表示标签的样式属性
function getStyle(node, cssStyle) {
    return node.currentStyle ? node.currentStyle[cssStyle] : getComputedStyle(node)[cssStyle];
}


// 同时设置多个css样式的函数,第二个参数是对象,键是css样式属性,值是样式属性的值;
function setStyle(node, cssObj) {
    for (attr in objStyle) {
        node.style[attr] = objStyle[attr];
    }
}


// 封装一个随机变化颜色的函数
function randomColor() {
    var str = 'rgb(' + parseInt(Math.random() * 256) + ',' + parseInt(Math.random() * 256) + ',' + parseInt(Math.random() * 256) + ')';
    return str;
}


// 封装一个随机变化颜色和颜色透明度的函数
function randomOpacityColor() {
    // 保留一位大于0小于1的小数,作为透明度的值
    var colorFloat = Math.random().toFixed(1);
    var str = 'rgba(' + parseInt(Math.random() * 256) + ',' + parseInt(Math.random() * 256) + ',' + parseInt(Math.random() * 256) + ',' + colorFloat + ')';
    // 透明度不能为0全透明,也不能为1不透明
    if (colorFloat > 0.2 && colorFloat < 1.0) {
        return str;
    } else {
        // 如果随机小数不符合if判断条件,就强制将透明度的值修改为0.3
        colorFloat = 0.3;
        var str = 'rgba(' + parseInt(Math.random() * 256) + ',' + parseInt(Math.random() * 256) + ',' + parseInt(Math.random() * 256) + ',' + colorFloat + ')';
        return str;
    }
}


// 事件监听兼容写法
function addEvent(node, eventType, funcName) {
    if (node.addEventListener) {
        node.addEventListener(eventType, funcName, false);
    } else {
        node.attachEvent('on' + eventType, funcName);
    }
}
// 删除事件监听器兼容写法
function removeEvent(node, eventType, funcName) {
    if (node.removeEventListener) {
        node.removeEventListener(eventType, funcName);
    } else {
        node.detachEvent('on' + eventType, funcName);
    }
}


// 选项卡功能的构造函数
function TabSwitch(id) {
    var node = document.getElementById(id);
    this.btns = node.getElementsByTagName('button');
    this.divs = node.getElementsByTagName('div');
    var _this = this;
    for (var i = 0; i < this.btns.length; i++) {
        this.btns[i].index = i;
        this.btns[i].onclick = function() {
            _this.tab(this);
        }
    }
}
TabSwitch.prototype.tab = function(btn) {
    for (let i = 0; i < this.btns.length; i++) {
        this.btns[i].id = '';
        this.divs[i].style.display = 'none';
    }
    btn.id = 'active';
    this.divs[btn.index].style.display = 'block';
}


// 封装拖拽构造函数
function Drag(id) {
    this.node = document.getElementById(id);
    var _this = this;
    this.node.onmousedown = function(ev) {
        _this.funcDown(ev);
    }

    document.onmouseup = this.funcUp;
}
Drag.prototype.funcDown = function(ev) {
    var e = ev || window.event;
    this.offsetX = e.clientX - this.node.offsetLeft;
    this.offsetY = e.clientY - this.node.offsetTop;
    var _this = this;
    document.onmousemove = function(ev) {
        _this.funcMove(ev);
    }
}
Drag.prototype.funcMove = function(ev) {
    var e = ev || window.event;
    this.node.style.left = e.clientX - this.offsetX + 'px';
    this.node.style.top = e.clientY - this.offsetY + 'px';
}
Drag.prototype.funcUp = function() {
    document.onmousemove = null;
}


// 封装限制拖拽出界的构造函数,继承拖拽构造函数
function LimitDrag(id) {
    Drag.call(this, id);
};
for (var item in Drag.prototype) {
    LimitDrag.prototype[item] = Drag.prototype[item];
}
LimitDrag.prototype.funcMove = function(ev) {
    var e = ev || window.event;
    var l = e.clientX - this.offsetX;
    var t = e.clientY - this.offsetY;
    if (l <= 0) {
        l = 0;
    }
    var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
    if (l >= windowWidth - this.node.offsetWidth) {
        l = windowWidth - this.node.offsetWidth;
    }
    if (t <= 0) {
        t = 0;
    }
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (t >= windowHeight - this.node.offsetHeight) {
        t = windowHeight - this.node.offsetHeight;
    }
    this.node.style.left = l + 'px';
    this.node.style.top = t + 'px';
}


// ajax传输数据的函数,必需要在调用方的同级目录下调用,否则报未定义错误
function $ajax({ method = 'get', url, data, success, error }) {
    var xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch (error) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    if (data) {
        data = querystring(data);
    }

    if (method == 'get' && data) {
        url += '?' + data;
    }

    xhr.open(method, url, true);

    if (method == 'get') {
        xhr.send();
    } else {

        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {

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
// 将用户传入的对象类型的数据遍历处理,拼接成查询字符串样式的数据,再返回处理好的字符串; 
function querystring(obj) {
    var str = '';
    for (var attr in obj) {
        str += attr + '=' + obj[attr] + '&';
    }
    return str.substring(0, str.length - 1);
}


// 写一个格式化年月日、时分秒，让输出的结果格式便于看
function format_date(time) {
    var date = new Date(time),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        month = month < 10 ? '0' + month : month,
        dates = date.getDate(),
        dates = dates < 10 ? '0' + dates : dates,
        arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        day = arr[date.getDay()],
        hours = date.getHours(),
        hours = hours < 10 ? '0' + hours : hours,
        minutes = date.getMinutes(),
        minutes = minutes < 10 ? '0' + minutes : minutes,
        seconds = date.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return year + '年' + month + '月' + dates + '日' + ' ' + day + ' ' + hours + ':' + minutes + ':' + seconds;

}