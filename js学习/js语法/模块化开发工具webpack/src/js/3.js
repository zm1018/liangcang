// 用AMD模块化语法导出这2个属性和方法,会在打包后的dist文件夹里自动生成一个单独的js文件

define(function() {
    let a = 3;

    function f1() {
        console.log('我是AMD模块化导出的方法');
    }

    // return对象里写的是把这2个属性和方法对外暴露
    return {
        f1: f1,
        a: a
    }
})