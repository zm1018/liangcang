// 声明私有属性和方法
let a = 1;
export let b = 2;
let c = 3;

function show() {
    console.log('ok');
}

// 对外暴露,要在其它文件中访问这个文件里的属性和方法,必需先用export导出
export default {
    a,
    c,
    show
}