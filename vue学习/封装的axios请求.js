// 因为axios是第三方框架,不能每个文件里都引入,否则如果axios不流行了,维护太麻烦,要每个文件都修改,所以直接封装在一个文件里,其它所有文件都引入这个文件,调用封装的函数来实现axios请求

// 引入axios.js文件
document.write('<script src = "https://unpkg.com/axios/dist/axios.min.js" > </script>');

// 自己封装的用于实现axios请求的函数,这是最简单的版本,axios的get()等方法都不能调用了
function myaxios(config) {
    // 创建一个axios实例,并进行基本请求设置
    const axios1 = axios.create({
        timeout: 3000,
        token1: 'mytoken'
    });
    // 调用实例发送请求,会最终返回一个promise对象,将请求结果返回给调用函数的用户,用户就可以调用then()拿到请求返回的数据
    return axios1(config);
}