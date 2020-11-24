// 这是个入口文件,要引入的文件都和这个入口文件在同级目录下,所有引入的文件路径前面必需写./,不然报错找不到这个引入文件;

// 在这个文件里引入1.js里commonjs语法导出的2个方法
const { add, mul } = require('./js/1.js');

// 使用1.js文件导出的2个方法,这时没有使用webpack打包,所以这个文件在html文件里引入,也不能执行,因为浏览器不支持commonjs语法,需要先用webpack打包,在打包时webpack会自动把commonjs转换成es6的模块化语法,并且会将转换好的新代码存到要放的那个新js文件里,在html里引入那个新的js文件,就可以正常执行了;
console.log(add(20, 30));
console.log(mul(20, 30));


// 在这个文件里引入2.js里es6语法导出的3个属性和方法
import obj from "./js/2"; //使用webpack时,文件的后缀.js可以省略不写
console.log(obj);
console.log(obj.a, obj.b, obj.add(3, 6));


// 在这个文件里引入 3.js里用AMD语法导出的2个属性和方法,后缀省略了,
// AMD模块开发的写法已经快淘汰了,而且webpack打包AMD写法的文件在自动转换成浏览器支持的语法时,会在新js文件里产生特别多的代码,可能有几十行,它还会自动另外生成一个134.js这种数字开头的文件,特别繁琐,上面两种模块开发写法可能只会产生几行代码,也不会另外生成其它文件,比较起来要简洁的多,
// 回调函数的形参amd是随便取的变量名,用来接收amd语法对外暴露的属性和方法的
require(["./js/3"], function(amd) {
    console.log(amd.a);
    amd.f1()
})


// 引入css文件,要渲染css样式,不用再像原来一样去html文件里一一引入了,只用去webpack.config.js文件里配置好把文件转换成模块的css-loader和style-loader这2个包,再去每个项目的入口文件里把css文件当做一个模块引入,包css-loader会先解析这个文件,再用import加载后返回这些css代码给webpack(也就是转换成webpack能识别的模块),这样执行打包时才不会报错,包style-loader会把这个css模块导出,把样式添加到html元素上执行;
// 这里演示模块化引入css文件:
require('./css/1.css')

// 在css文件里引入图片,处理图片打包要用url-loader
require('./css/背景图.css')


// cnpm i vue --save下载的vue模块以后项目打包上线了也要用,所以下载时不能加-dev,
// 引入本地安装的vue模块,在webpack中使用 import Vue from 'vue' 导入的vue，功能不完整，只提供了runtime-only的方式,这种方式不支持template模板解析,所以要去webpack配置里写alias属性指定导入另一个vue模块文件,换一种功能完整的方式,
// 但因为我没下载在本地,下载的是全局的vue,所以alias属性值必须要写vue包所在的绝对路径,反正先让vue模块能正常用就行,以后公司里写项目会把webpack和vue都安装在本地,就没有这个绝对路径的问题了
import Vue from 'vue';

/* // 使用vue模块有2种方式,建议用第二种.vue单文件形式,
//这种是在js文件里直接写vue代码时用的,不建议用这种写法,会让入口文件里的代码变得很多:
const app = new Vue({
    el: '#app',
    data: {
        msg: 'js文件里写vue代码'
    },
    methods: {
        f1() {
            console.log('演示用vue包');
        }
    }
}) */


//这种是引入vue单文件时用的,也就是后缀是.vue的文件,要用vue-router插件来转换这种文件,webpack才能打包,转换需要下载vue-loader和vue-template-compiler这2个loader包,再去配置文件里配置好才行
// 引入.vue文件,用变量app接收1.vue里写的vue根组件相关的代码
import app from './vue/1.vue';
// 创建vue实例
const vm = new Vue({
    el: '#app',
    // 在vue-template-compiler这个包的解析下,直接把.vue文件(组件)里的template模板解析成render()函数,所以解析后的app对象里已经没有template属性了,webpack打包可以在vue实例里直接调用render函数,直接把传入的实参app原template部分渲染成虚拟dom,再替换到el绑定的#app元素节点(就是index.html文件里写的id为#app的div标签)所在的位置;
    render: h => h(app)
})

/* 补充一下vue程序执行过程:
    template模板写在vue实例里时,vue会先把模板保存到实例的options属性里,
    再解析成ast(abstract syntax tree抽象语法树的意思),
    再编译成render()函数,
    再通过render()函数创建虚拟dom(virtual dom),形成虚拟dom树,
        render()函数的作用是创建元素节点, 
        形参 h实际是一个被赋值的变量,接收的是创建元素节点的代码: h = this.createElement();
    再把虚拟dom树替换el属性绑定的那个标签,渲染成真实的dom元素,显示到页面;

    vue-template-compiler包是处理 template -> ast 这2步的,最终把template模板处理成一个render函数,上面vue实例里直接调用render()函数是把这2步省略了,代码会变少,执行效率会提高,而且vue-template-compiler包是开发时用的,经它转换后,打包后要上线的js文件里都只有render()函数,没有template了,整个代码运行效率就更高了;   
*/