# 代码查看器插件系统

## 插件系统架构

代码查看器的插件系统采用了处理器模式，每个插件负责处理特定的内容，并通过插件总线汇总处理结果。

### 核心组件

1. **PluginManager**: 插件管理器，负责插件的注册、卸载和生命周期管理
2. **LineProcessorBus**: 行处理总线，负责汇总所有插件的处理结果
3. **LineProcessor**: 行处理器接口，定义插件如何处理代码行

## 插件开发指南

### 创建一个新插件

以下是创建一个新插件的基本步骤：

1. 实现 `LineProcessor` 接口
2. 创建插件工厂函数
3. 注册插件到 `PluginManager`

### 示例：行背景颜色插件

```typescript
import type { CodeLine, Plugin, PluginContext } from 'lib/core'
import { h } from 'vue'
import type { LineProcessor } from 'lib/core/plugin/src/processLines'

/**
 * 行背景颜色处理器
 * 处理代码行的背景颜色
 */
class LineBgColorProcessor implements LineProcessor {
  private name = 'line-bg-color'

  /**
   * 处理单行代码
   * @param line 代码行
   * @returns 处理后的代码行
   */
  processLine(line: CodeLine): CodeLine {
    const bgColor = line.meta?.bgColor as string
    // 用 h 函数生成 VNode，赋值到 line.vNode
    if (bgColor) {
      line.vNode = h('div', { class: 'code-line-content', style: { background: bgColor } }, [
        h('div', { class: 'line-content' }, line.content)
      ])
    }
    return line
  }

  /**
   * 获取处理器名称
   */
  getName(): string {
    return this.name
  }
}

// 创建插件工厂函数
export function createLineBgColorPlugin(): Plugin {
  // 创建处理器实例
  const processor = new LineBgColorProcessor()

  return {
    name: 'line-bg-color',

    install(context: PluginContext) {
      const { lineProcessorBus } = context
      
      // 注册行处理器到处理总线
      if (lineProcessorBus) {
        lineProcessorBus.registerProcessor(processor)
      }
    },

    uninstall(context: PluginContext) {
      const { lineProcessorBus } = context
      
      // 从处理总线中移除处理器
      if (lineProcessorBus) {
        lineProcessorBus.removeProcessor(processor.getName())
      }
    }
  }
}
```

## 使用插件

在 Vue 组件中使用插件：

```vue
<template>
  <code-viewer :code="code" :plugins="plugins" />
</template>

<script setup>
import { CodeViewer } from 'lib/core'
import { createLineBgColorPlugin } from 'lib/plugin/line-bg-color'

const code = [
  { id: 1, content: 'function hello() {', meta: { bgColor: '#f0f8ff' } },
  { id: 2, content: '  console.log("Hello, world!");' },
  { id: 3, content: '}', meta: { bgColor: '#f0f8ff' } }
]

const plugins = [
  createLineBgColorPlugin()
]
</script>
```

## 插件系统的优势

1. **解耦**: 每个插件只负责处理特定的内容，不需要关心其他插件的实现
2. **可扩展**: 可以轻松添加新的插件，扩展代码查看器的功能
3. **性能优化**: 通过处理器模式，避免了重复处理，提高了性能
4. **资源管理**: 插件系统负责资源的清理，避免内存泄漏