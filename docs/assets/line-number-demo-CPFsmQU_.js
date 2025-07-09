import{_ as t}from"./code-viewer.vue_vue_type_script_setup_true_lang-BYpU-SkN.js";/* empty css               */import{L as l}from"./index-CI7Qy5JG.js";import{d as r,c,o as m,a as e,b as i,u as o}from"./index-CCsrM5Sh.js";const u=`// 这是一个JavaScript示例
function calculateSum(a, b) {
  // 计算两个数的和
  return a + b;
}

// 类定义示例
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(\`Hello, my name is \${this.name} and I am \${this.age} years old.\`);
  }
}

// 创建实例并调用方法
const john = new Person("John", 30);
john.sayHello();

// 箭头函数和模板字符串
const greet = (name) => \`Welcome, \${name}!\`;
console.log(greet("User"));

// 条件语句
let x = 10;
if (x > 5) {
  console.log("x is greater than 5");
} else {
  console.log("x is less than or equal to 5");
}

// 数组方法
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled);

// 对象解构
const user = { name: "Alice", age: 25, email: "alice@example.com" };
const { name, email } = user;
console.log(name, email);

// Promise示例
new Promise((resolve, reject) => {
  setTimeout(() => resolve("Success!"), 1000);
})
  .then(result => console.log(result))
  .catch(error => console.error(error));

// 正则表达式
const pattern = /^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$/;
const isValidEmail = pattern.test("test@example.com");
console.log(isValidEmail);`,d={class:"p-4"},g={class:"h-96"},f=r({__name:"line-number-demo",setup(p){const a=u.split(`
`).map((s,n)=>({id:`line-${n+1}`,content:s}));return(s,n)=>(m(),c("div",d,[n[0]||(n[0]=e("div",{class:"mb-4"},[e("h3",{class:"text-lg font-medium text-gray-800 mb-2"},"行号插件"),e("p",{class:"text-sm text-gray-600"},"这个示例展示了代码行号功能。")],-1)),e("div",g,[i(o(t),{code:o(a),plugins:[o(l)],language:"javascript",size:"medium"},null,8,["code","plugins"])])]))}});export{f as default};
