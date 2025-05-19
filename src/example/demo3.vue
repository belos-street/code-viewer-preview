<!-- 测试 虚拟滚动 -->

<script setup lang="ts">
import { CodeViewer, type CodeList } from 'lib/index'

// 生成大量代码行以测试虚拟滚动
const generateLargeCode = (count: number): CodeList => {
  const code: CodeList = []
  for (let i = 1; i <= count; i++) {
    code.push({ id: `line${i}`, content: `const line${i} = "This is line ${i}";`, index: i })
  }
  return code
}

const initialCode = generateLargeCode(1000) // 生成10000行代码
</script>

<template>
  <h1>Virtual Scrolling Code Demo</h1>
  <div class="container">
    <CodeViewer :code="initialCode" />
  </div>
  <br />
</template>

<style lang="css" scoped>
.container {
  width: 100%;
  height: 500px;
}
</style>
