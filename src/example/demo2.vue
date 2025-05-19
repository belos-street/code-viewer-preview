<!-- 测试 简单渲染 -->

<script setup lang="ts">
import { CodeViewer, type CodeList } from 'lib/index'

const initialCode: CodeList = [
  { id: 'line1', content: 'const greet = (name: string) => {', index: 1 },
  { id: 'line2', content: '  console.log(`Hello, ${name}!`);', index: 2 },
  { id: 'line3', content: '};', index: 3 },
  { id: 'line4', content: '', index: 4 },
  { id: 'line5', content: 'greet("World");', index: 5 },
  {
    id: 'line6',
    content:
      '// This is a comment line with some extra long text to test wrapping and overflow behavior. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    index: 6
  },
  { id: 'line7', content: 'function anotherExample() {', index: 7 },
  { id: 'line8', content: '  return true;', index: 8 },
  { id: 'line9', content: '}', index: 9 }
]
</script>

<template>
  <h1>Simple Code Demo</h1>
  <div class="container">
    <CodeViewer :code="initialCode" />
  </div>
  <br />
</template>

<style lang="css" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 300px;
}
</style>
