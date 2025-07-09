# Code Viewer

一个功能强大、高性能的代码查看器组件，基于 Vue 3 、Typescript 开发，支持语法高亮、虚拟滚动、行号显示、列高亮、主题切换等多种功能。

## ✨ 特性

- 🎨 **语法高亮**：支持多种编程语言的语法高亮显示，包括 JavaScript、TypeScript、Python、Java、Go、C 和 C++
- 🔍 **代码搜索**：支持关键字搜索，包括正则表达式、大小写敏感和全词匹配选项
- 🖌️ **列高亮**：可以高亮显示代码中的特定列范围
- 🎯 **行背景色**：支持为特定代码行设置背景色
- 🔢 **行号显示**：可选择性显示或隐藏行号
- 📦 **虚拟滚动**：高效处理大量代码行，保持流畅的滚动体验
- 🌈 **主题切换**：提供多种内置主题，包括明暗两种模式
- 🧩 **插件系统**：可扩展的插件架构，轻松添加新功能
- 📏 **自定义行高**：支持调整行高以适应不同的显示需求
- 🔗 **行内容盒子**：可以在代码行中嵌入自定义内容

## 🌐 在线演示

你可以通过以下链接查看在线演示：

[Code Viewer 在线演示](https://belos-street.github.io/code-viewer-preview/)

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

代码查看器提供了可扩展的插件系统，你可以创建自定义插件来扩展功能。

### 插件接口说明

插件需要实现 `Plugin` 接口，该接口定义如下：

```typescript
export type Plugin = {
  name: string // 插件名称，唯一标识
  install: (context: PluginContext) => Promise<void> | void // 安装插件
  uninstall: (context: PluginContext) => Promise<void> | void // 卸载插件
  processedLines: (context: PluginContext) => Promise<ProcessedResult> | ProcessedResult
} & Record<string, any> // 插件可以有其他自定义方法和属性
```

插件上下文 `PluginContext` 包含以下内容：

```typescript
export type PluginContext = {
  codeLines: Ref<CodeLine[]> // 代码行数据的响应式引用
  visibleLines: ComputedRef<CodeLine[]> // 可见的代码行数据的响应式引用
  eventBus: Emitter<EventPayloads>
  language?: LanguageProps
} & Record<string, any> // 允许插件上下文扩展
```

### 开发自定义插件

创建一个自定义插件需要实现 `Plugin` 接口：

```typescript
import type { Plugin, PluginContext, ProcessedResult } from 'code-viewer'

export const MyCustomPlugin: Plugin = {
  name: 'my-custom-plugin',
  
  // 安装插件时调用
  install(context: PluginContext) {
    // 初始化逻辑
    console.log('Plugin installed')
  },
  
  // 处理代码行
  processedLines(context: PluginContext) {
    const { visibleLines } = context
    const processedResult: ProcessedResult = {}
    
    // 处理可见的代码行
    for (const line of visibleLines.value) {
      // 示例：为每个偶数行添加浅灰色背景
      if (line.index % 2 === 0) {
        processedResult[line.id] = [{ 
          container: 'view-line-content', 
          style: { backgroundColor: '#f5f5f5' } 
        }]
      }
    }
    
    return processedResult
  },
  
  // 卸载插件时调用
  uninstall() {
    // 清理逻辑
    console.log('Plugin uninstalled')
  }
}
```

### 插件处理结果

`processedLines` 方法返回的 `ProcessedResult` 类型定义如下：

```typescript
export type ProcessedItem = {
  container: 'view-line-content' | 'line-number' | 'line-content'
  style?: CSSProperties // CSS 样式对象，如 { backgroundColor: 'red' }
  content?: string | VNode[] // 行内容，可以是字符串或VNode数组
}

export type ProcessedResult = Record<RawCodeLine['id'], ProcessedItem[]>
```

其中：

- `container` 指定要处理的容器类型
- `style` 定义要应用的 CSS 样式
- `content` 可以替换容器的内容

### 高级用法

#### 访问插件管理器

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CodeViewer } from 'code-viewer'
import { MyCustomPlugin } from './my-custom-plugin'

const codeViewerRef = ref(null)

onMounted(() => {
  // 访问插件管理器
  const pluginManager = codeViewerRef.value.pluginManager
  
  // 动态注册插件
  pluginManager.registerPlugin(MyCustomPlugin)
  
  // 动态卸载插件
  pluginManager.uninstallPlugin('my-custom-plugin')
})
</script>

<template>
  <CodeViewer ref="codeViewerRef" :code="codeLines" />
</template>
```

#### 插件间通信

插件可以通过 `eventBus` 进行通信：

```typescript
// 在一个插件中发送事件
install(context: PluginContext) {
  const { eventBus } = context
  eventBus.emit('custom-event', { data: 'some data' })
}

// 在另一个插件中监听事件
install(context: PluginContext) {
  const { eventBus } = context
  eventBus.on('custom-event', (data) => {
    console.log('Received event:', data)
  })
}
```

### 最佳实践

1. **插件命名**：使用有意义的名称，避免与现有插件冲突
2. **性能优化**：在 `processedLines` 方法中只处理必要的代码行
3. **资源清理**：在 `uninstall` 方法中清理所有资源，避免内存泄漏
4. **错误处理**：妥善处理异常，避免影响整个代码查看器的功能
5. **样式隔离**：使用特定的 CSS 类名或属性选择器，避免样式冲突

## 📂 项目结构

### lib 目录结构

项目的核心代码位于 `lib` 目录下，结构如下：

```
lib/
├── core/                  # 核心组件和功能
│   ├── code-viewer.vue    # 主要组件
│   ├── event-bus.ts       # 事件总线
│   ├── hooks/             # Vue Hooks
│   │   ├── use-item-size.ts
│   │   └── use-virtual-scroll.ts
│   ├── plugin/            # 插件管理
│   ├── search-code.ts     # 代码搜索功能
│   └── types.ts           # 类型定义
├── plugin/                # 内置插件
│   ├── column-highlight/  # 列高亮插件
│   ├── line-bg-color/     # 行背景色插件
│   ├── line-number/       # 行号插件
│   └── syntax-highlight/  # 语法高亮插件
├── styles/                # 样式文件
└── utils/                 # 工具函数
```

### 示例文件目录

项目包含多个示例文件，展示了不同的功能和用法：

- `src/example/simple-code-demo.vue` - 简单代码示例
- `src/example/virtual-scroll-demo.vue` - 虚拟滚动示例
- `src/example/line-bg-color-demo.vue` - 行背景色示例
- `src/example/scroll-to-line-demo.vue` - 滚动到指定行示例
- `src/example/search-code-demo.vue` - 搜索代码关键字示例
- `src/example/syntax-highlight-demo.vue` - 语法高亮示例
- `src/example/theme-switch-demo.vue` - 主题切换示例
- `src/example/line-number-demo.vue` - 行号示例
- `src/example/box-height-demo.vue` - 可变高度盒子示例
- `src/example/column-highlight-demo.vue` - 列高亮示例

## 📄 许可证

[MIT](LICENSE)
