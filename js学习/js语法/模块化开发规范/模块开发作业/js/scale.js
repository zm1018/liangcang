// 封装一个缩放的函数
// 引入drag模块的限制出界功能
define(["drag"], function(drag) {
    // node1 缩放, node2拖拽
    function scale(node1, node2) {
        node2.onmousedown = function(ev) {
            var e = ev || window.event;
            // 初始鼠标位置
            var l = e.clientX;
            var t = e.clientY;
            // 初始node1的宽高
            var w = node1.offsetWidth;
            var h = node1.offsetHeight;
            document.onmousemove = function(ev) {
                var e = ev || window.event;
                // 计算当前物体的宽高,当前鼠标位置到初始鼠标位置的距离 + 初始宽高
                var W = (e.clientX - l) + w;
                var H = (e.clientY - t) + h;
                // 调用drag模块的限制出界功能,让缩放物体最小缩到100,最大放大到500
                W = drag.range(W, 100, 500);
                H = drag.range(H, 100, 500);
                // 缩放
                node1.style.width = W + 'px';
                node1.style.height = H + 'px';
            }
        }
        node2.onmouseup = function() {
            document.onmousemove = null;
        }
    }
    return {
        scale: scale
    }
})