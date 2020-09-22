// 实现拖拽 和 缩放的功能, 引入其他模块,调用其他模块里的功能
define(["scale", "drag"], function(scale, drag) {
    function init() {
        var div1 = document.getElementById('div1');
        var div2 = document.getElementById('div2');
        var div3 = document.getElementById('div3');
        var btn = document.getElementById('btn');

        btn.onclick = function() {
            div1.style.display = 'block';

            // 调用scale模块;
            scale.scale(div1, div2);
        }

        // 调用drag模块
        drag.drag(div3);
    }
    return {
        init: init
    }
})