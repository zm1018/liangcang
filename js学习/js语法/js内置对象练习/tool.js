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