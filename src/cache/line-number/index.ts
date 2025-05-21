import type { CodeLine, Plugin, PluginContext } from 'lib/core'

/**
 * 行号插件
 * @description 行号插件
 */
export const lineNumberPlugin: Plugin = {
  name: 'lineNumber', // 修改插件名称以匹配 code-viewer.vue 中的调用
  install(context: PluginContext) {
    console.log('Line Number Plugin installed.')
    // 在这里可以订阅事件或初始化逻辑
  },
  uninstall(context: PluginContext) {
    console.log('Line Number Plugin uninstalled.')
  },
  /**
   * 获取指定代码行的显示行号。
   * @param line 代码行对象，包含1-based的index属性。
   * @returns 行号字符串。
   */
  getDisplayLineNumber(line: CodeLine): string {
    return line.index.toString()
  }
}
