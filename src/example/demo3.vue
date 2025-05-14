<!-- 测试 虚拟滚动 -->

<script setup lang="ts">
import { CodeViewer, type CodeList } from 'lib/index'

// 生成大量代码行以测试虚拟滚动
const generateLargeCode = (count: number): CodeList => {
  const code: CodeList = []
  for (let i = 0; i < count; i++) {
    code.push({ id: `line${i}`, content: `const line${i} = "This is line ${i}";` })
  }
  return code
}

const initialCode = generateLargeCode(10000) // 生成10000行代码
</script>

<template>
  <div class="container">
    <h1>Virtual Scrolling Code Demo</h1>
    <CodeViewer :code="initialCode" />
  </div>
</template>

<style lang="css" scoped>
.container {
  width: 100%;
  height: 500px;
  /* 固定高度以触发滚动 */
}
</style>
