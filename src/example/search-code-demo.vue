<!-- 搜索代码关键字示例 -->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CodeViewer } from 'lib/core'
import { SyntaxHighlightPlugin, LineNumberPlugin } from 'lib/plugin'
import type { RawCodeLine } from 'lib/core/types'
import type { SearchOptions, SearchResult } from 'lib/core/search-code'
import syntaxHighlightCodeRaw from '../code-examples/syntax-highlight-code.txt?raw'

// 将代码内容转换为行数组
const codeLines: RawCodeLine[] = syntaxHighlightCodeRaw.split('\n').map((line, index) => ({
  id: `line-${index + 1}`,
  content: line
}))

// 代码查看器引用
const codeViewerRef = ref<InstanceType<typeof CodeViewer> | null>(null)

// 搜索相关状态
const keyword = ref('')
const useRegex = ref(false)
const caseSensitive = ref(false)
const wholeWord = ref(false)
const maxResults = ref<number | undefined>(undefined)
const searchResults = ref<SearchResult[]>([])
const currentResultIndex = ref(-1)
const isSearching = ref(false)

// 搜索结果统计
const resultStats = computed(() => {
  if (searchResults.value.length === 0) {
    return '无匹配结果'
  }
  return `找到 ${searchResults.value.length} 个结果${currentResultIndex.value >= 0 ? `，当前第 ${currentResultIndex.value + 1} 个` : ''}`
})

// 执行搜索
const performSearch = () => {
  if (!keyword.value.trim() || !codeViewerRef.value) {
    searchResults.value = []
    currentResultIndex.value = -1
    return
  }

  isSearching.value = true

  try {
    // 构建搜索选项
    const searchOptions: SearchOptions = {
      keyword: keyword.value,
      useRegex: useRegex.value,
      caseSensitive: caseSensitive.value,
      wholeWord: wholeWord.value,
      maxResults: maxResults.value
    }

    // 执行搜索
    searchResults.value = codeViewerRef.value.search(searchOptions)
    currentResultIndex.value = searchResults.value.length > 0 ? 0 : -1

    // 如果有结果，跳转到第一个结果
    if (currentResultIndex.value >= 0) {
      navigateToResult(currentResultIndex.value)
    }
  } catch (error) {
    console.error('搜索出错:', error)
    searchResults.value = []
    currentResultIndex.value = -1
  } finally {
    isSearching.value = false
  }
}

// 导航到指定结果
const navigateToResult = (index: number) => {
  if (index >= 0 && index < searchResults.value.length && codeViewerRef.value) {
    const result = searchResults.value[index]
    codeViewerRef.value.scrollToLine(result.line.index)
    currentResultIndex.value = index
  }
}

// 导航到下一个结果
const navigateToNextResult = () => {
  if (searchResults.value.length === 0) return

  const nextIndex = (currentResultIndex.value + 1) % searchResults.value.length
  navigateToResult(nextIndex)
}

// 导航到上一个结果
const navigateToPrevResult = () => {
  if (searchResults.value.length === 0) return

  const prevIndex = currentResultIndex.value <= 0 ? searchResults.value.length - 1 : currentResultIndex.value - 1
  navigateToResult(prevIndex)
}

// 清除搜索
const clearSearch = () => {
  keyword.value = ''
  searchResults.value = []
  currentResultIndex.value = -1
}

// 高亮匹配文本
const highlightMatches = (content: string, matches: [number, number][]) => {
  if (!matches || matches.length === 0) return content
  
  // 对匹配位置按照起始位置排序
  const sortedMatches = [...matches].sort((a, b) => a[0] - b[0])
  
  let result = ''
  let lastIndex = 0
  
  // 处理每个匹配项
  for (const [start, end] of sortedMatches) {
    // 添加匹配前的文本
    result += escapeHtml(content.substring(lastIndex, start))
    // 添加高亮的匹配文本
    result += `<span class="bg-yellow-200 text-black px-0.5 rounded">${escapeHtml(content.substring(start, end))}</span>`
    lastIndex = end
  }
  
  // 添加最后一个匹配后的文本
  result += escapeHtml(content.substring(lastIndex))
  
  return result
}

// 转义HTML特殊字符
const escapeHtml = (text: string) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <h3 class="text-lg font-medium text-gray-800 mb-2">搜索代码关键字</h3>
      <p class="text-sm text-gray-600 mb-4">这个示例展示了如何使用搜索功能查找代码中的关键字，并跳转到匹配行。</p>

      <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
        <!-- 搜索输入框和按钮 -->
        <div class="flex flex-wrap items-center gap-3 mb-4">
          <div class="flex-grow">
            <div class="flex items-center">
              <input
                v-model="keyword"
                type="text"
                placeholder="输入搜索关键字"
                class="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                @keyup.enter="performSearch"
              />
              <button
                @click="performSearch"
                class="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors"
                :disabled="isSearching || !keyword.trim()"
              >
                {{ isSearching ? '搜索中...' : '搜索' }}
              </button>
              <button
                v-if="searchResults.length > 0"
                @click="clearSearch"
                class="ml-2 px-3 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded text-sm transition-colors"
              >
                清除
              </button>
            </div>
          </div>
        </div>

        <!-- 搜索选项 -->
        <div class="flex flex-wrap gap-4 mb-4">
          <label class="flex items-center text-sm text-gray-700">
            <input type="checkbox" v-model="useRegex" class="mr-1" />
            使用正则表达式
          </label>
          <label class="flex items-center text-sm text-gray-700">
            <input type="checkbox" v-model="caseSensitive" class="mr-1" />
            区分大小写
          </label>
          <label class="flex items-center text-sm text-gray-700">
            <input type="checkbox" v-model="wholeWord" class="mr-1" />
            全字匹配
          </label>
        </div>

        <!-- 搜索结果导航 -->
        <div v-if="searchResults.length > 0" class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            {{ resultStats }}
          </div>
          <div class="flex gap-2">
            <button
              @click="navigateToPrevResult"
              class="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-sm transition-colors"
              :disabled="searchResults.length <= 1"
            >
              上一个
            </button>
            <button
              @click="navigateToNextResult"
              class="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-sm transition-colors"
              :disabled="searchResults.length <= 1"
            >
              下一个
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="h-96 border border-gray-200">
      <CodeViewer
        ref="codeViewerRef"
        :code="codeLines"
        :plugins="[SyntaxHighlightPlugin, LineNumberPlugin]"
        language="javascript"
        size="medium"
      />
    </div>

    <!-- 搜索结果详情 -->
    <div v-if="searchResults.length > 0" class="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600">
      <h4 class="font-medium mb-2">搜索结果详情:</h4>
      <div class="max-h-40 overflow-y-auto">
        <div
          v-for="(result, index) in searchResults"
          :key="index"
          class="py-1 px-2 mb-1 rounded cursor-pointer hover:bg-gray-200"
          :class="{ 'bg-blue-100': index === currentResultIndex }"
          @click="navigateToResult(index)"
        >
          <div class="flex items-center">
            <span class="font-medium mr-2">行 {{ result.line.index }}:</span>
            <span class="mr-2 text-blue-600 text-xs">
              [{{ result.matches.length > 1 ? `${result.matches.length}个匹配` : '1个匹配' }}]
            </span>
            <span v-html="highlightMatches(result.line.content, result.matches)"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
