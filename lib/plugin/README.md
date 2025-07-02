# Code Viewer 插件系统

本文档介绍了 Code Viewer 的插件系统，包括插件的结构、如何使用现有插件以及如何开发自定义插件。

## 目录

- [现有插件](#现有插件)
- [插件使用示例](#插件使用示例)
- [插件接口说明](#插件接口说明)
- [开发自定义插件](#开发自定义插件)

## 现有插件

Code Viewer 目前提供了以下内置插件：

### 1. 行号插件 (LineNumberPlugin)

为代码添加行号显示功能。

### 2. 语法高亮插件 (SyntaxHighlightPlugin)

根据编程语言对代码进行语法高亮处理，支持多种编程语言，包括：
- JavaScript
- TypeScript
- Python
- Java
- Go
- C
- HTML

### 3. 行背景色插件 (LineBgColorPlugin)

允许为特定代码行设置自定义背景颜色，通过 `meta.bgColor` 属性指定。

## 插件使用示例

### 行号插件示例

```vue
<script setup lang="ts">
import { CodeViewer } from 'lib/core'
import { LineNumberPlugin } from 'lib/plugin'
import type { RawCodeLine } from 'lib/core/types'

const codeLines: RawCodeLine[] = [
  { id: 'line-1', content: 'function example() {' },
  { id: 'line-2', content: '  console.log("Hello World");' },
  { id: 'line-3', content: '}' }
]
</script>

<template>
  <CodeViewer 
    :code="codeLines" 
    :plugins="[LineNumberPlugin]" 
    language="javascript" 
    size="medium" 
  />
</template>
```

### 语法高亮插件示例

```vue
<script setup lang="ts">
import { CodeViewer } from 'lib/core'
import { SyntaxHighlightPlugin } from 'lib/plugin'
import type { RawCodeLine } from 'lib/core/types'

const codeLines: RawCodeLine[] = [
  { id: 'line-1', content: 'function example() {' },
  { id: 'line-2', content: '  console.log("Hello World");' },
  { id: 'line-3', content: '}' }
]
</script>

<template>
  <CodeViewer 
    :code="codeLines" 
    :plugins="[SyntaxHighlightPlugin]" 
    language="javascript" 
    size="medium" 
  />
</template>
```

### 行背景色插件示例

```vue
<script setup lang="ts">
import { CodeViewer, LineBgColorPlugin } from 'lib/index'
import type { RawCodeLine } from 'lib/core/types'

const codeLines: RawCodeLine[] = [
  { id: '1', content: 'This line has no specific style.' },
  { id: '2', content: 'This line should have a red background.', meta: { bgColor: 'red' } },
  { id: '3', content: 'This line should have blue background.', meta: { bgColor: 'blue' } },
  { id: '4', content: 'This line should have a green background.', meta: { bgColor: 'green' } },
  { id: '5', content: 'Another normal line.' }
]
</script>

<template>
  <CodeViewer :code="codeLines" :plugins="[LineBgColorPlugin]" />
</template>
```

### 组合多个插件

```vue
<template>
  <CodeViewer 
    :code="codeLines" 
    :plugins="[LineNumberPlugin, SyntaxHighlightPlugin, LineBgColorPlugin]" 
    language="javascript" 
    size="medium" 
  />
</template>
```

## 插件接口说明

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

## 开发自定义插件

### 基本结构

创建一个自定义插件需要实现 `Plugin` 接口：

```typescript
import type { Plugin, PluginContext, ProcessedResult } from 'lib/core'

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

### 注册和使用自定义插件

```vue
<script setup lang="ts">
import { CodeViewer } from 'lib/core'
import { MyCustomPlugin } from './my-custom-plugin'
import type { RawCodeLine } from 'lib/core/types'

const codeLines: RawCodeLine[] = [
  // 代码行数据
]
</script>

<template>
  <CodeViewer :code="codeLines" :plugins="[MyCustomPlugin]" />
</template>
```

## 高级用法

### 访问插件管理器

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CodeViewer } from 'lib/core'
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

### 插件间通信

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

## 最佳实践

1. **插件命名**：使用有意义的名称，避免与现有插件冲突
2. **性能优化**：在 `processedLines` 方法中只处理必要的代码行
3. **资源清理**：在 `uninstall` 方法中清理所有资源，避免内存泄漏
4. **错误处理**：妥善处理异常，避免影响整个代码查看器的功能
5. **样式隔离**：使用特定的 CSS 类名或属性选择器，避免样式冲突