function add(num1, num2) {
    return num1 + num2;
}

function mul(num1, num2) {
    return num2 * num1;
}

// 用commonjs的模块化开发的写法把这两个方法对外暴露:
module.exports = {
    add,
    mul
}