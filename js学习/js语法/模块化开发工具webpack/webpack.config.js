// 导入使用node里的内置模块path
const path = require('path')

// 导入使用本地安装的vue-loader包里的plugin插件,必需要导入这个插件在plugins属性里配置好,否则vue-loader无法使用,不能转换.vue类型的文件,导入后返回一个构造函数,自己定义个VueLoaderPlugin变量来接收这个构造函数
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 如果所有包都安装在本地,git就显示有几千个文件要上传,所以我所有包都是全局安装的,全局vue-loader包,要用plugin插件得把路径写全,否则报错找不到这个插件在哪里
const VueLoaderPlugin = require('C:/Users/Administrator/AppData/Roaming/npm/node_modules/vue-loader/lib/plugin');

// 导入使用webpack模块,用来调用下面写插件的地方里写的webpack内置的插件,webpack也返回一个构造函数,使用插件代码这样写,例如:new webpack.xxx插件名()
// const webpack = require('webpack');
// 我是全局安装的webpack,要把路径写成绝对路径,不然找不到webpack包在哪
const webpack = require('C:/Users/Administrator/AppData/Roaming/npm/node_modules/webpack');

// 导入第三方插件html-webpack-plugin,用来在打包时自动生成一个index.html文件,在html文件的body里自动加一个script标签把打包后的js文件引入,也返回一个构造函数,用插件时在下面写插件的地方new一个实例对象
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPlugin = require('C:/Users/Administrator/AppData/Roaming/npm/node_modules/html-webpack-plugin')


// webpack的配置文件用commonjs的语法写导出
module.exports = {
    // 设置编译模式为开发模式,打包时速度快些,打包后代码不压缩
    mode: 'development',
    // 设置入口文件,就是要把哪个文件打包
    entry: './src/main.js',
    // 设置出口文件,就是要打包到哪个文件里
    output: {
        // 上面引入的path包里有2个方法,用来设置动态路径的,2个方法的效果一样,第一个参数__dirname是node里的全局变量,是获取是从盘符开始到当前这个配置文件为止的绝对路径,,第二个参数是要打包到这个项目的哪个文件夹里,把文件名写上,这行代码编译后是绝对路径拼接动态路径,它会把前面的绝对路径 D:/git/mygit/js学习/模块化开发工具webpack/ 和第二个参数 dist 进行拼接,再和filename属性的值main.js进行拼接, 最后变成完整的路径 D:/git/mygit/js学习/模块化开发工具webpack/dist.main.js;
        // path: path.resolve(__dirname, 'dist'),
        path: path.join(__dirname, 'dist'),
        // 设置要把所有代码打包到哪个文件里去的文件名
        filename: 'main.js'
    },

    /* // publicPath属性是专门设置公共的url路径的,设置这个属性后,所有url打包后都会在前面拼接上这个属性值里写的路径,
    // 用了打包时在dist文件夹里自动生成一个和自己写的一样的index.html文件的插件html-webpack-plugin后,dist文件夹里的index.html使用dist文件夹里的图片,路径就是对的,所以不需要这个配置了,要把这个配置注释掉
    publicPath: 'dist/', //这是打包图片用的,给大于limit属性值限制的图片用,因为比limit属性值大的图片都会在打包时自动生成一个单独的图片文件存到dist文件夹里,打包后的js文件里用的是自动生成的图片文件的路径,路径是在dist文件夹里,那我自己写的index.html文件因为和dist文件夹同级,在使用打包后的js文件时,就找不到这张dist文件夹里的图片,就无法正常显示,所以用publicPath属性把所有打包后的路径前面都加上dist文件夹,index.html就能找到文件,正常加载显示了
 */

    // 我是在全局安装的各种loader包,这些包都是node里的,要使用必需先将放置 这些个loader包的目录告诉 webpack,这个resolveLoader属性是专门用来配置webpack loader的检索规则,能让webpack通过path里写的路径找到css-loader和style-loader包,本地安装的就不用配置这个路径了;
    resolveLoader: {
        // 配置 modules的值是个数组,里面可以传多个元素,reslove()是将这个绝对路径和下面use属性里写的css-loader和style-loader包名拼接成一个完整路径,这样webpack执行打包时才能找到这2个包,执行这2个包来加载css文件,解析渲染css代码;
        modules: [path.resolve('C:/Users/Administrator/AppData/Roaming/npm/', 'node_modules')]
    },

    // module属性是用来配置loader系列的包的,loader系列的包作用是做转换,是把原文件(.css,.vue,.sass之类的文件)转换成js能处理的代码,再把转换结果返回给webpack打包;
    module: {
        // rules属性是配置第三方模块的匹配规则
        rules: [
            // 这里配置css文件要用的loader包:
            {
                // test属性是告诉css-loader包要加载的什么类型的文件,属性值是正则表达式,这里匹配的是.css文件;
                test: /\.css$/,
                // use属性这里写要使用的包名,就会和上面那个绝对路径拼接成一个完整路径,找到这2个包的位置,执行把css文件转换成模块,引入到main.js好让webpack处理打包;
                // webpack和loader系列的所有包都建议安装在当前项目里(也就是本地),如果安装在本地,它会自己去本地的node_modules文件夹里找这2个包,这里直接这样写就行了,不用再写上面那一大串绝对路径了;
                use: ['style-loader', 'css-loader']
            },

            // 这里配置图片要用的loader包:
            {
                // 图片有好多种后缀,正则里都写上
                test: /\.(png|jpg|gif|jpeg)$/,
                // use属性值数组里传对象的写法
                use: [{
                    // 写webpack打包图片要用的loader名,因为图片都是引入路径,所以转换图片的loader叫url-loader,转换图片时会先看配置这里有没有设置limit属性限制图片大小
                    loader: 'url-loader',
                    // 如果配置loader时有参数要设置,就用options属性
                    options: {
                        // limit属性是限制图片大小的,属性值是要限制图片最大不超过多少,计算方法是:要限制图片大小的kb*1024,图片小于limit属性值就会被转换成base64格式字符串直接嵌入代码中,打包后不会生成单独的图片文件,如果超过limit属性值就会被转成file文件格式,就需要url-loader和file-loader来转换,file-loader不用配置,打包后就会在dist文件夹里自动生成一个单独的图片文件,这个文件名是个32位的hash值,又长又不知道原来没打包之前图片叫什么名字了
                        limit: 8196, //8kb大小
                        // name属性是把自动生成的32位hash值图片名字给配置成规范的名字,
                        // 把自动生成的图片文件都放在img文件夹里,把原来图片名字传过来通过[name]变量接收,为了防止重复在原名字后面拼接个8位的hash值.[hash:8],再把原来的后缀名传过来通过[ext]变量接收,给打包后自动生成的图片文件名作为命名规则用
                        name: 'img/[name].[hash:8].[ext]'
                    }
                }]
            },

            // 这里配置vue文件要用的loader包:
            {
                test: /\.vue$/,
                // use属性有3种值,数组里传对象/数组里传字符串/直接写字符串
                use: 'vue-loader'
            }
        ]
    },

    // resolve属性是配置要解析的东西,比如引入文件时省略后缀名等配置, 这是主要是写vue包要用的配置,因为vue默认用的是不支持模板语法的那个版本,所以打包后无法解析模板语法,导致页面上渲染不出来任何写在vue模板里的内容,这里把vue要用的版本文件改成另一个支持模板语法的版本文件的路径;
    resolve: {
        // 给支持模板语法的版本文件取个别名,要不然每次写一大串路径,太长了
        alias: {
            // 这是在本地安装vue后要写的路径
            // 'vue$': 'vue/dist/vue.js'
            // 这是在全局安装vue后要写的路径,不然它会在 '模块开发工具webpack'这个项目文件夹里找vue包,我又没安装在本地,肯定是找不到的,会报不支持模板的错;
            'vue$': 'C:/Users/Administrator/AppData/Roaming/npm/node_modules/vue/dist/vue.js'
        }
    },

    // plugins属性是配置插件的
    plugins: [
        // 这里是使用(实例化)最上面引入的plugin插件,vue-loader要用这个插件支持才能转换.vue文件,webpack打包才不会报错,
        new VueLoaderPlugin(),

        // BannerPlugin是给打包后生成的js文件头上加个版权声明的插件,是webpack内置的插件,要先导入webpack,也是个构造函数,需要new一个webpack实例对象才能调用插件,来使用插件,()里可以写版权,开发日期,归属等等信息
        new webpack.BannerPlugin('最终版权归zm所有'),

        // html-webpack-plugin插件是在打包后的文件夹里自动生成一个index.html文件,并把打包后的js文件在这个html文件里引入,上面先导入了这个插件,这里new一个插件的实例对象,但这个html文件里只引入了js文件,原文件的html里写的vue实例绑定的标签它不会自动生成,所以还需要给这个实例对象里传一个template属性,属性值是我们写的原html文件,告诉插件按template指定的模板html文件来自动生成个html文件就可以了
        new HtmlWebpackPlugin({
            template: 'index.html' //按照我写的index.html来生成个一样的html文件
        })

    ]


}