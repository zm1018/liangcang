// 这是vue代码不写在js文件里,单独写成一个文件,叫单文件,后缀是.vue

// template标签里是写模板语法的地方,这里的内容会替换vue实例里el属性绑定的那个标签,把这里的内容填充到el绑定的那个标签的位置,渲染到页面
<template>
    <div>
        <h1>这是在node里安装的vue演示:{{msg}}</h1>
        <button @click="f2">点击</button>

        <!-- 使用导入的子组件app2 -->
        <app2/>
    </div>
</template>

// script标签里是写vue逻辑代码的地方
<script>
// 要导入的子组件文件,在这个位置导入
import app2 from './2.vue'

// script标签里写的这些逻辑代码必需写在es6模块化语法的export default默认导出对象里
export default {
    data(){
        return{
            msg: '我是vue单文件里的根组件'
        }
    },
    methods:{
        f2(){
            console.log('演示用vue-router包在webpack里打包的.vue文件');
        }
    },
    // 注册导入的子组件app2
    components:{
        app2
    }
}
</script>


// style标签是专门写css样式的地方,但为了防止和其它vue文件里的样式冲突,要给每个style标签里加一个scoped属性来避免冲突
<style scoped>
    h1 {
        color: red;
    }
</style>