<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'

// 定义Demo接口
interface Demo {
  id: 'simple' | 'virtual-scroll' | 'line-bg-color' | 'scroll-to-line' | 'syntax-highlight' | 'line-number';
  title: string;
}

// 使用异步组件，只有在需要时才会加载
const SimpleCodeDemo = defineAsyncComponent(() => import('./example/simple-code-demo.vue'))
const VirtualScrollDemo = defineAsyncComponent(() => import('./example/virtual-scroll-demo.vue'))
const LineBgColorDemo = defineAsyncComponent(() => import('./example/line-bg-color-demo.vue'))
const ScrollToLineDemo = defineAsyncComponent(() => import('./example/scroll-to-line-demo.vue'))
const SyntaxHighlightDemo = defineAsyncComponent(() => import('./example/syntax-highlight-demo.vue'))
const LineNumberDemo = defineAsyncComponent(() => import('./example/line-number-demo.vue'))

const demos: Demo[] = [
  { id: 'simple', title: '简单代码示例' },
  { id: 'virtual-scroll', title: '虚拟滚动示例' },
  { id: 'line-bg-color', title: '行背景色示例' },
  { id: 'scroll-to-line', title: '滚动到指定行示例' },
  { id: 'syntax-highlight', title: '语法高亮示例' },
  { id: 'line-number', title: '行号示例' }
]

const activeDemo = ref<Demo>(demos[0])

const setActiveDemo = (demo: Demo): void => {
  activeDemo.value = demo
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <header class="bg-blue-600 text-white p-4 shadow-md">
      <h1 class="text-2xl font-bold">Code Viewer 示例</h1>
    </header>

    <main class="flex-1 p-4 md:p-6 lg:p-8">
      <div class="max-w-7xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <!-- 侧边导航 -->
          <nav class="w-full md:w-64 bg-gray-100 p-4">
            <h2 class="text-lg font-medium mb-4 text-gray-700">示例列表</h2>
            <ul class="space-y-2">
              <li v-for="demo in demos" :key="demo.id">
                <button
                  @click="setActiveDemo(demo)"
                  class="w-full text-left px-3 py-2 rounded transition-colors"
                  :class="{
                    'bg-blue-500 text-white': activeDemo.id === demo.id,
                    'hover:bg-gray-200 text-gray-700': activeDemo.id !== demo.id
                  }"
                >
                  {{ demo.title }}
                </button>
              </li>
            </ul>
          </nav>

          <!-- 内容区域 -->
          <div class="flex-1 p-4 md:p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-800">{{ activeDemo.title }}</h2>
            <div class="border border-gray-200 rounded-lg overflow-hidden">
              <!-- 根据activeDemo.id动态渲染对应组件 -->
              <SimpleCodeDemo v-if="activeDemo.id === 'simple'" />
              <VirtualScrollDemo v-else-if="activeDemo.id === 'virtual-scroll'" />
              <LineBgColorDemo v-else-if="activeDemo.id === 'line-bg-color'" />
              <ScrollToLineDemo v-else-if="activeDemo.id === 'scroll-to-line'" />
              <SyntaxHighlightDemo v-else-if="activeDemo.id === 'syntax-highlight'" />
              <LineNumberDemo v-else-if="activeDemo.id === 'line-number'" />
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-gray-800 text-white text-center p-4 text-sm">
      <p>Code Viewer 示例 &copy; {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>
