<template>
  <div class="demo-container">
    <h2>语法高亮插件演示</h2>
    <p>这个演示展示了代码语法高亮功能</p>

    <div class="code-containers">
      <div class="code-container">
        <h3>语法高亮</h3>
        <CodeViewer :code="codeLines" :plugins="[createSyntaxHighlightPlugin()]" language="javascript" size="medium" />
      </div>

      <div class="code-container">
        <h3>原始代码（无高亮）</h3>
        <CodeViewer :code="codeLines" size="medium" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CodeViewer } from 'lib/core'
import { createLineBgColorPlugin, createSyntaxHighlightPlugin } from 'lib/plugin'
import type { RawCodeLine } from 'lib/core/types'

// 选择的语言

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
    content: line, // 空行用空格代替，避免高度塌陷
    meta: { bgColor: 'blue' }
  }))
)
</script>

<style scoped>
.demo-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.controls {
  margin: 20px 0;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.language-selector {
  display: flex;
  align-items: center;
  gap: 10px;
}

.language-selector label {
  font-weight: 500;
}

.language-selector select {
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: white;
}

.code-containers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.code-container {
  height: 600px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.code-container h3 {
  margin: 0;
  padding: 10px 15px;
  background: #f1f3f5;
  border-bottom: 1px solid #dee2e6;
  font-size: 16px;
  font-weight: 500;
}

.code-container .code-viewer {
  flex: 1;
  overflow: auto;
}

h2 {
  color: #495057;
  margin-bottom: 10px;
}

p {
  color: #6c757d;
  margin-bottom: 20px;
}
</style>
