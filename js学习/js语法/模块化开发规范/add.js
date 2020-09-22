// 模块化规范写法的声明函数方式:
define(["math"], function(math) { //这里还引入子目录里的math模块的功能,继承math模块的功能
    // 在函数的大括号(模块)里定义自己写的函数
    function add(x, y) {
        alert('哈哈哈');
        alert(math.outJi(9)); // 调用math模块的功能
        return x + y;
    }

    function show() {
        alert('hello');
    }
    // 对外暴露,return一个对象
    return {
        outAdd: add,
        outShow: show
    }
})