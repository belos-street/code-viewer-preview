<!-- 可变高度盒子示例 -->

<script setup lang="ts">
import { CodeViewer, type RawCodeLine } from 'lib/index'
import { LineNumberPlugin } from 'lib/plugin'
import { h } from 'vue'

// 生成带有可变高度盒子的代码行
const generateCodeWithBoxes = (): RawCodeLine[] => {
  const code: RawCodeLine[] = []

  // 生成100行代码
  for (let i = 1; i <= 100; i++) {
    const line: RawCodeLine = {
      id: `line${i}`,
      content: `const line${i} = "This is line ${i}";`
    }

    // 每5行添加一个盒子，高度为行高的2倍
    if (i % 5 === 0 && i % 10 !== 0) {
      // 避免与10的倍数冲突
      line.meta = {
        boxHeightMultiplier: 1,
        boxContent: h('div', { class: 'flex flex-col gap-2  overflow-hidden bg-black/[0.03] rounded ml-12 px-12' }, [
          h('div', { class: 'font-bold text-blue-600' }, `Box for line ${i}`)
        ])
      }
    }

    // 每10行添加一个更大的盒子，高度为行高的4倍
    if (i % 10 === 0) {
      line.meta = {
        boxHeightMultiplier: 2,
        boxContent: h('div', { class: 'flex flex-col overflow-hidden bg-yellow/[0.3] rounded ml-12' }, [
          h('div', { class: 'font-bold text-red-600' }, `Larger box for line ${i}`),
          h('div', { class: 'text-gray-600' }, 'This is a larger custom box with variable height.')
        ])
      }
    }

    code.push(line)
  }

  return code
}

const codeLines: RawCodeLine[] = generateCodeWithBoxes()
</script>

<template>
  <div class="p-4">
    <div class="mb-4 flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-800 mb-2">可变高度盒子示例</h3>
        <p class="text-sm text-gray-600">这个示例展示了在代码行下方添加可变高度盒子的功能。</p>
      </div>
    </div>

    <div class="h-96 border border-gray-200">
      <CodeViewer :code="codeLines" :plugins="[LineNumberPlugin]" />
    </div>
  </div>
</template>
