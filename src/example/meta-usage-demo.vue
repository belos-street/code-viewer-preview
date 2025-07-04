<template>
  <div class="demo-container transition-all duration-300">
    <div class="flex items-center justify-between mb-4">
      <h2 class="demo-title m-0">Meta 属性使用示例</h2>
    </div>

    <div class="bg-gray-100 dark:bg-gray-900 p-3 rounded-md mb-4 text-sm">
      <p class="m-0 text-gray-700 dark:text-gray-300">
        此示例展示了如何使用 meta 属性来控制代码行的各种特性，包括列高亮、行背景色、隐藏行号和禁用语法高亮等。
      </p>
    </div>

    <div class="code-box h-300px shadow-sm">
      <CodeViewer :code="codeLines" :plugins="plugins" language="javascript" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CodeViewer } from '../../lib'
import { ColumnHighlightPlugin, LineNumberPlugin, SyntaxHighlightPlugin, LineBgColorPlugin } from '../../lib/plugin'
import { ref } from 'vue'

// 创建示例代码行
const codeLines = ref([
  {
    id: 1,
    content: '// 普通代码行 - 默认样式',
    meta: {}
  },
  {
    id: 2,
    content: '// 带背景色的代码行',
    meta: {
      bgColor: 'rgba(173, 216, 230, 0.2)' // 浅蓝色背景
    }
  },
  {
    id: 3,
    content: 'function calculateSum(a, b) {',
    meta: {
      // 列高亮示例
      columnHighlights: [
        {
          startColumn: 9,
          endColumn: 21,
          style: { backgroundColor: 'rgba(255, 255, 0, 0.3)' } // 黄色半透明背景
        }
      ]
    }
  },
  {
    id: 4,
    content: '  return a + b; // 禁用语法高亮的行',
    meta: {
      // 禁用语法高亮
      disableSyntaxHighlight: true,
      // 添加背景色
      bgColor: 'rgba(255, 228, 225, 0.3)' // 浅红色背景
    }
  },
  {
    id: 5,
    content: '}',
    meta: {}
  },
  {
    id: 6,
    content: '// 隐藏行号的代码行',
    meta: {
      // 隐藏行号
      hideLineNumber: true,
      // 添加背景色
      bgColor: 'rgba(144, 238, 144, 0.2)' // 浅绿色背景
    }
  },
  {
    id: 7,
    content: 'const result = calculateSum(10, 20);',
    meta: {
      // 组合多种特性
      columnHighlights: [
        {
          startColumn: 6,
          endColumn: 12,
          style: { backgroundColor: 'rgba(0, 255, 0, 0.2)' } // 绿色半透明背景
        }
      ],
      bgColor: 'rgba(255, 250, 205, 0.3)' // 浅黄色背景
    }
  }
])

// 注册插件
const plugins = [ColumnHighlightPlugin, SyntaxHighlightPlugin, LineNumberPlugin, LineBgColorPlugin]
</script>

<!-- 使用 UnoCSS 替代传统 CSS -->