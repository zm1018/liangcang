// 写一个math模块,和入口文件main.js不在同一目录下
define(function() {
    var a = 2;

    function ji(n) {
        return a * n;
    }
    return {
        outJi: ji
    }
})

// 子目录的文件引入父目录的文件会报错,路径写对了也报错,应该是不能这么操作吧
// define(["../add"], function(add) {
//     var a = 2;

//     function ji(n) {
//         alert(add.outAdd(10, 10));
//         return a * n;
//     }
//     return {
//         outJi: ji
//     }
// })