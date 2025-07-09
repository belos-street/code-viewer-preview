# Code Viewer

一个功能强大、高性能的代码查看器组件，基于 Vue 3 、Typescript 开发，支持语法高亮、虚拟滚动、行号显示、列高亮、主题切换等多种功能。

## ✨ 特性

- 🎨 **语法高亮**：支持多种编程语言的语法高亮显示
- 🔍 **代码搜索**：支持关键字搜索，包括正则表达式、大小写敏感和全词匹配选项
- 🖌️ **列高亮**：可以高亮显示代码中的特定列范围
- 🎯 **行背景色**：支持为特定代码行设置背景色
- 🔢 **行号显示**：可选择性显示或隐藏行号
- 📦 **虚拟滚动**：高效处理大量代码行，保持流畅的滚动体验
- 🌈 **主题切换**：提供多种内置主题，包括明暗两种模式
- 🧩 **插件系统**：可扩展的插件架构，轻松添加新功能
- 📏 **自定义行高**：支持调整行高以适应不同的显示需求
- 🔗 **行内容盒子**：可以在代码行中嵌入自定义内容

## 📚 使用方法

### 基本用法

```vue
<template>
  <CodeViewer :code="codeLines" />
</template>

<script setup lang="ts">
import { CodeViewer, type RawCodeLine } from 'code-viewer'

const codeLines: RawCodeLine[] = [
  { id: 'line1', content: 'function hello() {' },
  { id: 'line2', content: '  console.log("Hello, world!");' },
  { id: 'line3', content: '}' }
]
</script>
```

### 使用插件

```vue
<template>
  <CodeViewer 
    :code="codeLines" 
    :plugins="[SyntaxHighlightPlugin, LineNumberPlugin]" 
    language="javascript" 
  />
</template>

<script setup lang="ts">
import { CodeViewer, type RawCodeLine } from 'code-viewer'
import { SyntaxHighlightPlugin, LineNumberPlugin } from 'code-viewer/plugin'

const codeLines: RawCodeLine[] = [...] // 代码行数组
</script>
```

### 使用列高亮

```vue
<template>
  <CodeViewer :code="codeLines" :plugins="[ColumnHighlightPlugin]" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CodeViewer } from 'code-viewer'
import { ColumnHighlightPlugin } from 'code-viewer/plugin'

const codeLines = ref([
  {
    id: '1',
    content: 'function calculateSum(a, b) {',
    meta: {}
  },
  {
    id: '2',
    content: '  return a + b;',
    meta: {
      columnHighlights: [
        {
          startColumn: 9, // 从第9列开始
          endColumn: 14, // 到第14列结束
          style: { backgroundColor: 'rgba(255, 255, 0, 0.3)' } // 黄色半透明背景
        }
      ]
    }
  },
  {
    id: '3',
    content: '}',
    meta: {}
  }
])
</script>
```

### 搜索代码

```vue
<template>
  <div>
    <input v-model="keyword" @keyup.enter="search" />
    <button @click="search">搜索</button>
    
    <CodeViewer ref="codeViewerRef" :code="codeLines" :plugins="[SyntaxHighlightPlugin]" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CodeViewer } from 'code-viewer'
import { SyntaxHighlightPlugin } from 'code-viewer/plugin'
import type { SearchOptions } from 'code-viewer'

const codeViewerRef = ref(null)
const keyword = ref('')

const search = () => {
  if (!codeViewerRef.value || !keyword.value) return
  
  const options: SearchOptions = {
    keyword: keyword.value,
    caseSensitive: false,
    wholeWord: false
  }
  
  const results = codeViewerRef.value.search(options)
  
  if (results.length > 0) {
    // 跳转到第一个结果
    codeViewerRef.value.scrollToLine(results[0].line.index)
  }
}
</script>
```

### 切换主题

```vue
<template>
  <div>
    <select v-model="currentTheme">
      <option v-for="theme in themes" :key="theme.value" :value="theme.value">
        {{ theme.label }}
      </option>
    </select>
    
    <CodeViewer 
      :code="codeLines" 
      :plugins="[SyntaxHighlightPlugin]" 
      :theme="currentTheme" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CodeViewer, CodeViewerTheme } from 'code-viewer'
import { SyntaxHighlightPlugin } from 'code-viewer/plugin'

const themes = [
  { label: 'VSCode', value: CodeViewerTheme.VSCode },
  { label: 'VSCode 暗黑', value: CodeViewerTheme.VSCodeDark },
  { label: 'Dracula', value: CodeViewerTheme.Dracula },
  { label: 'GitHub', value: CodeViewerTheme.Github }
]

const currentTheme = ref(CodeViewerTheme.VSCode)
const codeLines = [...] // 代码行数组
</script>
```

## 📋 可用插件

- **SyntaxHighlightPlugin**: 语法高亮插件
- **LineNumberPlugin**: 行号显示插件
- **ColumnHighlightPlugin**: 列高亮插件
- **LineBgColorPlugin**: 行背景色插件

## 🔌 插件系统

代码查看器提供了可扩展的插件系统，你可以创建自定义插件来扩展功能：

```typescript
import type { Plugin, PluginContext, ProcessedResult } from 'code-viewer'

export const MyCustomPlugin: Plugin = {
  name: 'my-custom-plugin',
  
  install(context: PluginContext) {
    // 插件初始化逻辑
  },
  
  processedLines(context: PluginContext): ProcessedResult {
    const { visibleLines } = context
    const processedResult: ProcessedResult = {}
    
    // 处理可见行
    for (const line of visibleLines.value) {
      // 实现自定义处理逻辑
    }
    
    return processedResult
  },
  
  uninstall(context: PluginContext) {
    // 清理逻辑
  }
}
```

## 📄 许可证

[MIT](LICENSE)
