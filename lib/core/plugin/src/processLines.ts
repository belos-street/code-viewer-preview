import type { CodeLine } from '../../types'

/**
 * 行处理器接口
 * 定义插件如何处理代码行
 */
export interface LineProcessor {
  /**
   * 处理单行代码
   * @param line 代码行
   * @returns 处理后的代码行
   */
  processLine(line: CodeLine): CodeLine

  /**
   * 获取处理器名称
   */
  getName(): string
}

/**
 * 行处理总线
 * 负责汇总所有插件的处理结果
 */
export class LineProcessorBus {
  private processors: LineProcessor[] = []
  private processedLineIds = new Set<string | number>()

  /**
   * 注册行处理器
   * @param processor 行处理器
   */
  registerProcessor(processor: LineProcessor): void {
    this.processors.push(processor)
  }

  /**
   * 移除行处理器
   * @param processorName 处理器名称
   */
  removeProcessor(processorName: string): void {
    const index = this.processors.findIndex((p) => p.getName() === processorName)
    if (index !== -1) {
      this.processors.splice(index, 1)
    }
  }

  /**
   * 处理代码行
   * @param lines 代码行数组
   */
  processLines(lines: CodeLine[]): void {
    lines.forEach((line) => {
      // 如果已经处理过，跳过
      if (this.processedLineIds.has(line.id)) return

      // 依次应用每个处理器
      this.processors.forEach((processor) => {
        processor.processLine(line)
      })

      // 标记为已处理
      this.processedLineIds.add(line.id)
    })
  }

  /**
   * 清理已处理的行ID缓存
   */
  clearProcessedLineIds(): void {
    this.processedLineIds.clear()
  }

  /**
   * 获取所有处理器
   */
  getProcessors(): LineProcessor[] {
    return [...this.processors]
  }
}