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


// 封装一个跨浏览器获取内部或外部css样式的函数
// node表示变量名(标签),是获取到的标签赋值给变量
// cssStyle表示标签的样式属性
function getStyle(node, cssStyle) {
    return node.currentStyle ? node.currentStyle[cssStyle] : getComputedStyle(node)[cssStyle];
}


// 封装一个随机变化颜色的函数
function randomColor() {
    var str = 'rgb(' + parseInt(Math.random() * 256) + ',' + parseInt(Math.random() * 256) + ',' + parseInt(Math.random() * 256) + ')';
    return str;
}


// 封装一个随机变化颜色和颜色透明度的函数
function randomOpcityColor() {
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


// 鼠标拖拽移动物体,可以拖拽出窗口界的
function drag(node) {
    node.onmousedown = function(ev) {
        var e = ev || window.event;
        var offsetX = e.clientX - node.offsetLeft;
        var offsetY = e.clientY - node.offsetTop;
        document.onmousemove = function(ev) {
            var e = ev || window.event;
            node.style.left = e.clientX - offsetX + 'px';
            node.style.top = e.clientY - offsetY + 'px';
        }
    }
    document.onmouseup = function() {
        document.onmousemove = null;
    }
}

// 鼠标拖拽移动物体,不能出窗口界的
function limitDrag(node) {
    node.onmousedown = function(ev) {
        var e = ev || window.event;
        var offsetX = e.clientX - node.offsetLeft;
        var offsetY = e.clientY - node.offsetTop;
        document.onmousemove = function(ev) {
            var e = ev || window.event;
            var l = e.clientX - offsetX;
            var t = e.clientY - offsetY;

            if (l <= 0) {
                l = 0;
            }
            var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
            if (l >=
                windowWidth - node.offsetWidth) {
                l = windowWidth - node.offsetWidth;
            }
            if (t <= 0) {
                t = 0;
            }
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if (t >= windowHeight - node.offsetHeight) {
                t = windowHeight - node.offsetHeight;
            }

            node.style.left = l + 'px';
            node.style.top = t + 'px';
        }
    }
    document.onmouseup = function() {
        document.onmousemove = null;
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