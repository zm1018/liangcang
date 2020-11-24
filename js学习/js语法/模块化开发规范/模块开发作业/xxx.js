// 这是入口文件,在这里配置要导入的3个js文件路径,
require.config({
    paths: {
        "index": "js/index",
        "scale": "js/scale",
        "drag": "js/drag"
    }
})

// 这里导入AMD模块化开发语法对外暴露的init方法,导入这个文件路径,函数形参是这个文件名,通过文件名.方法名()调用方法
require(["index"], function(index) {
    index.init();
})