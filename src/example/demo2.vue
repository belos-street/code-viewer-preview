<!-- 测试 简单渲染 -->

<script setup lang="ts">
import { CodeViewer, type RawCodeLine } from 'lib/index'

const initialCode: RawCodeLine[] = [
  { id: 'line1', content: 'const greet = (name: string) => {' },
  { id: 'line2', content: '  console.log(`Hello, ${name}!`);' },
  { id: 'line3', content: '};' },
  { id: 'line4', content: '' },
  { id: 'line5', content: 'greet("World");' },
  {
    id: 'line6',
    content:
      '// This is a comment line with some extra long text to test wrapping and overflow behavior. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  { id: 'line7', content: 'function anotherExample() {' },
  { id: 'line8', content: '  return true;' },
  { id: 'line9', content: '}' }
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
