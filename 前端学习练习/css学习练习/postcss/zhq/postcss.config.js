// 这写的都是node的语法

// 通过require引入autoprefixer插件
const autoprefixer = require('autoprefixer');
// 引入postcss-import插件,import是node语法里的关键字，引用命名时不能有和关键字重名的，会报错，所以连在一起写
const postcssimport = require('postcss-import');
// 引入cssnano插件
const cssnano = require("cssnano");
// 引入cssnext插件
const cssnext = require('postcss-cssnext');
// 引入stylelint插件
const stylelint = require('stylelint');
// 引入sprites插件
const sprites = require('postcss-sprites');

// 提供接口
/* module.exports = {
    // 使用插件的列表，里面可以写多个插件
    plugins: [
        // 兼容浏览器，添加前缀插件
        // autoprefixer({
        //     // 会自动查caniuse网站的数据库，再根据当前浏览器的普及度以及属性支持情况决定是否提供给样式前缀，括号里的%是浏览器所占的市场份额，不知道欧朋浏览器是不是没有中国用户，不加in CN，欧朋的前缀才能显示。
        //     browsers: [' > 0.15% in CN ']
        // }),
        // 合并css文件的作用
        postcssimport,
        // 压缩css代码的作用
        cssnano,
        // 这个插件对高级的css语法进行降级让所有浏览器都支持的，功能很多，例如直接在css文件里写变量，让它自动降级转换成所有浏览器都支持的css样式,而且它包含给代码自动识别支持情况，添加浏览器前缀的功能。
        cssnext,
        // stylelint({
        //     'rules': {
        //         // 可以检测很多语法规则，可以设置很多规则，这里只设置了检测颜色写法是否规范
        //         "color-no-invalid-hex": true
        //     }
        // }),
        sprites({
            // 自动生成的雪碧图保存到zhh文件夹里，如果想换路径，直接改这里就行了
            spritePath: './zhh'
        }),
    ]
};
*/