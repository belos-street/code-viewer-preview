import type { Plugin, PluginContext } from 'lib/core'

/**
 * 行号插件
 * @description 行号插件
 * 内置插件，自动注册，无需手动引入
 */
export const lineNumberPlugin: Plugin = {
  name: 'line-number-plugin',
  install(context: PluginContext) {
    console.log('Line Number Plugin installed.')
    // 在这里可以订阅事件或初始化逻辑
  },
  uninstall(context: PluginContext) {
    console.log('Line Number Plugin uninstalled.')
  },
  renderLineNumbers(code: CodeLine[], container: HTMLElement) {
    code.forEach((line, index) => {
      const lineNumberElement = document.createElement('span')
      lineNumberElement.className = 'code-line-gutters__index'
      lineNumberElement.textContent = (index + 1).toString()
      container.appendChild(lineNumberElement)
    })
  }
}
