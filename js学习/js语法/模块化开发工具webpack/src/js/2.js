let a = 33;
let b = 66;

function add(num1, num2) {
    return num1 + num2;
}
//用es6模块化语法把这3个属性和方法对外暴露
export default {
    a,
    add,
    b
}