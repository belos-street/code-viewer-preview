<!-- 主题切换示例 -->

<script setup lang="ts">
import { ref } from 'vue'
import { CodeViewer } from 'lib/core'
import { SyntaxHighlightPlugin } from 'lib/plugin'
import { CodeViewerTheme } from 'lib/core/types'
import type { RawCodeLine } from 'lib/core/types'
import syntaxHighlightCodeRaw from '../code-examples/syntax-highlight-code.txt?raw'

// 将代码内容转换为行数组
const codeLines: RawCodeLine[] = syntaxHighlightCodeRaw.split('\n').map((content, index) => ({
  id: `line-${index + 1}`,
  content
}))

// 插件配置
const plugins = [SyntaxHighlightPlugin]

// 主题列表
const themes = [
  { label: 'VSCode', value: CodeViewerTheme.VSCode },
  { label: 'VSCode 暗黑', value: CodeViewerTheme.VSCodeDark },
  { label: 'Dracula', value: CodeViewerTheme.Dracula },
  { label: 'Dracula 暗黑', value: CodeViewerTheme.DraculaDark },
  { label: 'Eva', value: CodeViewerTheme.Eva },
  { label: 'Eva 暗黑', value: CodeViewerTheme.EvaDark },
  { label: 'GitHub', value: CodeViewerTheme.Github },
  { label: 'GitHub 暗黑', value: CodeViewerTheme.GithubDark }
]

// 当前主题
const currentTheme = ref(CodeViewerTheme.VSCode)

// 切换主题 - 通过更新 currentTheme 响应式变量
const changeTheme = (theme: CodeViewerTheme) => {
  currentTheme.value = theme
}
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <h3 class="text-lg font-medium text-gray-800 mb-2">主题切换示例</h3>
      <p class="text-sm text-gray-600">这个示例展示了如何切换代码查看器的主题。</p>
    </div>

    <div class="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h4 class="text-md font-medium text-gray-700 mb-2">选择主题</h4>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="theme in themes"
          :key="theme.value"
          @click="changeTheme(theme.value)"
          :class="{
            'bg-blue-500 hover:bg-blue-600 text-white': currentTheme === theme.value,
            'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300': currentTheme !== theme.value
          }"
          class="px-3 py-1 rounded text-sm transition-colors"
        >
          {{ theme.label }}
        </button>
      </div>
    </div>

    <div class="h-96 border border-gray-200 rounded-lg overflow-hidden">
      <CodeViewer :code="codeLines" :plugins="plugins" :theme="currentTheme" language="javascript" size="medium" />
    </div>

    <div class="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600">
      <p>当前主题: {{ themes.find((t) => t.value === currentTheme)?.label }}</p>
      <p class="mt-2">提示: 您可以通过 <code>:theme</code> 属性切换主题，组件会自动响应主题变化。</p>
    </div>
  </div>
</template>
