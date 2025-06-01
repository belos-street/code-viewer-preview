# 性能优化方案 - LineBgColorPlugin

## 问题描述

当 `codeLines` 长度很大时（如10000行），原始的插件实现会对所有代码行进行处理，这会影响页面的渲染性能。

## 优化方案

### 1. 按需处理 (On-Demand Processing)

- **原理**: 只处理当前可见的代码行 (`visibleLines`)，而不是处理所有代码行 (`codeLines`)
- **优势**: 大幅减少初始渲染时的计算量，提升页面响应速度

### 2. 缓存机制 (Caching)

- **实现**: 使用 `Set<string | number>` 记录已处理的代码行ID
- **优势**: 避免重复处理同一行，当虚拟滚动回到之前的位置时直接使用缓存的 `vNode`

### 3. 响应式监听 (Reactive Watching)

- **方案选择**: 使用 Vue 的 `watch` 函数监听 `visibleLines` 变化
- **原因**: 滚动事件触发频率很高，`watch` 比事件总线更适合这种场景
- **配置**: `{ immediate: false, deep: false }` 优化性能

## 技术实现

### 核心代码结构

```typescript
// 创建插件工厂函数，确保每个实例都有独立的状态
function createLineBgColorPlugin(): Plugin {
  // 每个插件实例的私有变量
  const processedLineIds = new Set<string | number>()
  let watchStopHandle: WatchStopHandle | null = null

  return {
    name: 'line-bg-color',
    
    install(context: PluginContext) {
      const { visibleLines } = context
      
      const processVisibleLines = (lines: any[]) => {
        lines.forEach((line) => {
          // 缓存检查 - 避免重复处理
          if (processedLineIds.has(line.id)) {
            return
          }
          
          // 处理逻辑
          const bgColor = line.meta?.bgColor
          if (bgColor) {
            line.vNode = h('div', { style: { background: bgColor } }, line.content)
          } else {
            line.vNode = h('div', {}, line.content)
          }
          
          // 标记为已处理
          processedLineIds.add(line.id)
        })
      }
      
      // 初始处理
      processVisibleLines(visibleLines.value)
      
      // 监听变化
      watchStopHandle = watch(
        visibleLines,
        processVisibleLines,
        { immediate: false, deep: false }
      )
    },
    
    uninstall() {
      // 清理资源
      if (watchStopHandle) {
        watchStopHandle()
        watchStopHandle = null
      }
      processedLineIds.clear()
    }
  }
}

// 导出插件工厂函数
export const LineBgColorPlugin = createLineBgColorPlugin()
```

### 事件总线支持

虽然主要使用 `watch`，但也保留了事件总线的支持：

```typescript
// 在 code-viewer.vue 中
const { visibleLines, totalHeight } = useVirtualScroll<CodeLine>({
  containerRef: codeViewerContentRef,
  itemHeight: lineHeight.value,
  items: codeLines.value,
  onScroll: (scrollTop, visibleLines) => {
    // 触发滚动事件，供插件使用（可选）
    eventBus.emit('scroll', visibleLines)
  }
})
```

## 性能对比

| 场景 | 原始方案 | 优化方案 | 性能提升 |
|------|----------|----------|----------|
| 10000行初始渲染 | 处理全部10000行 | 只处理可见行(~20行) | ~500倍 |
| 滚动到已访问区域 | 重新处理 | 使用缓存 | 避免重复计算 |
| 内存使用 | 所有行都有vNode | 按需创建vNode | 显著减少 |

## 使用示例

查看 `src/example/demo-performance.vue` 文件，该示例演示了：

- 10000行代码的处理
- 实时显示处理统计
- 滚动性能测试

## 最佳实践

1. **插件设计**: 优先考虑只处理可见行
2. **缓存策略**: 对计算密集的操作使用缓存
3. **监听方式**: 高频事件使用 `watch`，低频事件使用事件总线
4. **资源清理**: 在 `uninstall` 中正确清理资源
5. **状态隔离**: 使用工厂函数模式确保每个组件实例都有独立的插件状态，避免多实例间的状态污染

## 扩展性

这个优化方案可以应用到其他插件：

- 语法高亮插件
- 行号插件  
- 代码折叠插件
- 等等...

所有需要处理大量代码行的插件都可以采用类似的按需处理 + 缓存的策略。