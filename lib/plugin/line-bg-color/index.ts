import type { CodeLine, Plugin, PluginContext } from '../../core'
import { h } from 'vue'
import type { LineProcessor } from '../../core/plugin'

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
