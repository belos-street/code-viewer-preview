<!-- 测试 主题 -->

<script setup lang="ts">
import { CodeViewer, type CodeList } from 'lib/index';
import { lineNumberPlugin } from 'lib/plugin';
import { pluginManager } from 'lib/core/shared'; // 导入共享的 pluginManager
import { onBeforeMount } from 'vue';

// 在组件挂载前注册插件
onBeforeMount(() => {
  pluginManager.registerPlugin(lineNumberPlugin);
});

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
  <div class="container">
    <h1>Simple Code Demo</h1>
    <CodeViewer :code="initialCode" />
  </div>
</template>

<style lang="css" scoped>
.container {
  width: 100%;
}
</style>
