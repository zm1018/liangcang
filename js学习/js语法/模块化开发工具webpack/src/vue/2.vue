// 这个vue文件是要放在根组件里使用的子组件,要在根组件1.vue文件里导入
<template>
    <div>
        <h2 class="login">我是vue的子组件,写在.vue单文件模板里:{{msg}}</h2>
    </div>
</template>

<script>
export default {
    data(){
        return{
            msg:'hello'
        }
    }
}
</script>

<style>
    .login {
        color: blue;
    }
</style>