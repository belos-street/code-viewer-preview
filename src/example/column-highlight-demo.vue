<template>
  <div class="demo-container transition-all duration-300">
    <div class="flex items-center justify-between mb-4">
      <h2 class="demo-title m-0">列高亮示例</h2>
    </div>

    <div class="bg-gray-100 dark:bg-gray-900 p-3 rounded-md mb-4 text-sm">
      <p class="m-0 text-gray-700 dark:text-gray-300">
        此示例展示了如何在代码行中添加列高亮效果。高亮可以应用于代码中的特定部分，如变量、表达式或关键字。
      </p>
    </div>

    <div class="code-box h-300px shadow-sm">
      <CodeViewer :code="codeLines" :plugins="plugins" language="javascript" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CodeViewer } from '../../lib'
import { ColumnHighlightPlugin, LineNumberPlugin, SyntaxHighlightPlugin } from '../../lib/plugin'
import { ref } from 'vue'

// 创建示例代码行
const codeLines = ref([
  {
    id: 1,
    content: 'function calculateSum(a, b) {',
    meta: {}
  },
  {
    id: 2,
    content: '  // 计算两个数的和',
    meta: {}
  },
  {
    id: 3,
    content: '  return a + b;',
    meta: {
      // 为第3行添加列高亮，高亮 "a + b" 部分
      columnHighlights: [
        {
          startColumn: 9, // 从第9列开始（0索引）
          endColumn: 14, // 到第14列结束（不包含）
          style: { backgroundColor: 'rgba(255, 255, 0, 0.3)' } // 黄色半透明背景
        }
      ]
    }
  },
  {
    id: 4,
    content: '}',
    meta: {}
  },
  {
    id: 5,
    content: '',
    meta: {}
  },
  {
    id: 6,
    content: 'const result = calculateSum(10, 20);',
    meta: {
      // 为第6行添加多个列高亮
      columnHighlights: [
        {
          startColumn: 6, // "result" 变量
          endColumn: 12,
          style: { backgroundColor: 'rgba(0, 255, 0, 0.2)' } // 绿色半透明背景
        },
        {
          startColumn: 28, // 参数 "10, 20"
          endColumn: 34,
          style: { backgroundColor: 'rgba(0, 0, 255, 0.2)' } // 蓝色半透明背景
        }
      ]
    }
  },
  {
    id: 7,
    content: 'console.log(`The sum is: ${result}`);',
    meta: {
      // 为第7行添加列高亮，使用不同样式
      columnHighlights: [
        {
          startColumn: 27, // "result" 变量
          endColumn: 33,
          style: {
            backgroundColor: 'rgba(255, 0, 0, 0.2)', // 红色半透明背景
            borderBottom: '2px solid red' // 添加底部边框
          }
        }
      ]
    }
  }
])

// 注册插件
const plugins = [ColumnHighlightPlugin, SyntaxHighlightPlugin, LineNumberPlugin]
</script>

<!-- 使用 UnoCSS 替代传统 CSS -->
