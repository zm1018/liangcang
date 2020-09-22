// 在入口文件里引入add.js文件,在同级目录下,直接写文件名
// require(["add"], function(add) { //将前面引入加载的模块名,作为参数传给回调函数,在回调函数内部执行模块里的方法,这会在引入的模块全部加载完毕才执行
//     var res = add.outAdd(10, 20); //调用add模块的两个方法
//     alert(res);
//     add.outShow();
// })

// 在入口文件里引入math.js文件,不在同一目录下,需要引入的时候写全路径,或配置好路径,或更改文件目录:
// require(["demo/math"], function(math) {
//     alert(math.outJi()); //调用
// })

// 配置好路径,让require()引入时直接写文件名,不用写全路径,一定要写在入口文件最上面
// require.config()函数的参数是解构形式传参
require.config({
    // paths属性是配置所有需要管理的js模块文件路径的,对象类型,键值对都要带""
    paths: {
        // 配置math.js文件的路径
        "math": "demo/math"
    }
})

// 引入多个模块文件,因为上面配置好了math.js模块的路径,所以这里可以直接写名字
require(["add", "math"], function(add, math) { //将前面引入加载的模块名,作为参数传给回调函数,在回调函数内部执行模块里的方法,这会在引入的模块全部加载完毕才执行
    var res = add.outAdd(10, 20); //调用
    alert(res);
    add.outShow();
    alert(math.outJi(6));
})