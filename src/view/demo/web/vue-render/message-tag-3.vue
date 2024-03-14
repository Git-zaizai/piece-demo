<template>
  <div class="message-tag w-100 flex-fdc-alc-juc">
    <n-tag type="warning" closable> 超人不会飞 </n-tag>
    <n-tag type="error" closable> 手写的从前 </n-tag>

    <n-tag type="success" closable> 爱在西元前 </n-tag>
    <n-tag closable> 不该 </n-tag>

    <n-tag type="info" closable> 哪里都是你 </n-tag>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'success'
  },
  msg: {
    type: String,
    default: 'msg'
  },
  closable: {
    type: Boolean,
    default: false
  },
  index: {
    type: Number,
    default: 0
  }
})
</script>
<style scoped lang="scss">
.message-tag {
}
</style>
