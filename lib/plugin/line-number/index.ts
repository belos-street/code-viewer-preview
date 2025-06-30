import type { Plugin, PluginContext, ProcessedResult } from 'lib/core'
import './styles.css'

// 创建行号插件工厂函数
export function createLineNumberPlugin(): Plugin {
  return {
    name: 'line-number',

    install() {
      // const { visibleLines } = context
      // // 处理可见行的函数
      // const processVisibleLines = (lines: CodeLine[]) => {
      //   lines.forEach((line) => {
      //     // 创建行号元素
      //       // 如果已经有 vNode，保留其内容，但添加行号
      //       if (line.vNode) {
      //         const existingContent = line.vNode
      //         line.vNode = h('div', { class: 'line-with-number' }, [
      //           h('span', { class: 'line-number' }, String(line.index)),
      //           h('div', { class: 'line-content' }, [existingContent])
      //         ])
      //       } else {
      //         // 如果没有 vNode，创建新的包含行号的 vNode
      //         line.vNode = h('div', { class: 'line-with-number' }, [
      //           h('span', { class: 'line-number' }, String(line.index)),
      //           h('div', { class: 'line-content', innerHTML: line.content })
      //         ])
      //       }
      //   })
      // }
    },
    processedLines(context: PluginContext) {
      const { visibleLines } = context

      const processedResult: ProcessedResult = {}
      for (const line of visibleLines.value) {
        processedResult[line.id] = [
          {
            container: 'line-number',
            content: String(line.index)
          }
        ]
      }

      return processedResult
    },

    uninstall() {}
  }
}
