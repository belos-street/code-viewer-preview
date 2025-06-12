<template>
  <div class="demo-container">
    <h2>行号插件演示</h2>
    <p>这个演示展示了代码行号功能</p>

    <div class="code-containers">
      <div class="code-container">
        <CodeViewer :code="codeLines" :plugins="[createLineNumberPlugin()]" size="medium" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CodeViewer } from 'lib/core'
import { createLineNumberPlugin } from 'lib/plugin'
import type { RawCodeLine } from 'lib/core/types'

// 示例JavaScript代码
const jsCode = `// 这是一个JavaScript示例
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
    console.log(\`Hello, my name is years old.\`);
  }
}

// 创建实例并调用方法
const john = new Person("John", 30);
john.sayHello();

// 箭头函数和模板字符串
const greet = (name) => \`Welcome!\`;
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
const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const isValidEmail = pattern.test("test@example.com");
console.log(isValidEmail);`
// 将代码转换为行数据
const codeLines = ref<RawCodeLine[]>(
  jsCode.split('\n').map((line, index) => ({
    id: `line-${index + 1}`,
    content: line,
  }))
)
</script>

<style scoped>
.demo-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  height: 600px;
}

.code-containers {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 600px;
}

.code-container {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 10px;
  background-color: #f8f8f8;
  height: 600px;
}

h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
}
</style>
