<!-- 测试 event bus -->

<script setup lang="ts">
import { EventBus } from 'lib/core/event-bus'
import { onMounted } from 'vue'

const eventBus = new EventBus()
// 定义事件处理函数
const handleEvent = (message: string) => {
  console.log('Received message:', message)
}

const handleEvent1 = (message: string) => {
  console.log('Received message1:', message)
}

// 在组件挂载时监听事件
onMounted(() => {
  eventBus.on('demo-event', handleEvent)
  eventBus.on('demo-event', handleEvent1)
})

//取消监听事件
const cancelEvent = () => {
  eventBus.off('demo-event', handleEvent)
}

// 触发事件的方法
const triggerEvent = () => {
  eventBus.emit('demo-event', 'Hello from demo1.vue!')
}
</script>

<template>
  <div>
    <h1>Event Bus Demo</h1>
    <button @click="triggerEvent">Trigger Event</button>
    <button @click="cancelEvent">Cancel Event</button>
  </div>
</template>
