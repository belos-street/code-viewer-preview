<!-- 测试 event bus -->

<script setup lang="ts">
import { CodeViewer, type CodeList } from 'lib/index'

const initialCode: CodeList = [
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
  <div>
    <h1>Event Bus Demo</h1>
    <CodeViewer :code="initialCode" />
  </div>
</template>
