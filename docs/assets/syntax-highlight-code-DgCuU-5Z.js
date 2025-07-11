const n=`// 这是一个JavaScript示例
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
console.log(isValidEmail);`;export{n as s};
