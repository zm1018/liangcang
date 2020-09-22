define(function() {
    function drag(node) {
        node.onmousedown = function(ev) {
            var e = ev || window.event;
            var l = e.clientX - this.offsetLeft;
            var t = e.clientY - this.offsetTop;

            document.onmousemove = function(ev) {
                var e = ev || window.event;
                var x = e.clientX - l;
                var y = e.clientY - t;

                var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;

                var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;

                // 同一个模块里的私有方法,可以直接调用,不需要引入
                // 参数 x当前物体距左的距离, 0最小值, windowWidth - node.offsetWidth最大值
                x = range(x, 0, windowWidth - node.offsetWidth);
                y = range(y, 0, windowHeight - node.offsetHeight);
                node.style.left = x + 'px';
                node.style.top = y + 'px';

            }
            document.onmouseup = function() {
                document.onmousemove = null;
            }
        }
    }

    // 限制出界的函数
    // 参数 cur当前值,min最小值,max最大值
    function range(cur, min, max) {
        if (cur <= min) {
            cur = min;
        } else if (cur >= max) {
            cur = max;
        } else {
            return cur;
        }
    }
    return {
        drag: drag,
        range: range
    }
})