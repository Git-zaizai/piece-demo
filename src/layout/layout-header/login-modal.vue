<script setup lang="ts" name="login-modal">
import { login } from '@/api'
import local from '@/utils/Storage'

const router = useRouter()
const show = ref(false)
const pad = ref<string>('')
const active = ref(false)
defineExpose({ show })

watch(active, val => {
  if (val) {
    pad.value = '10077'
  } else {
    pad.value = ''
  }
})

const loginClk = async () => {
  let messageReactive = null
  try {
    messageReactive = window.$message.loading('登录中...', {
      duration: 0
    })
    const res = await login({ pwd: pad.value })
    local.set('info', res.data.data)
    setTimeout(() => {
      messageReactive.destroy()
      show.value = false
      router.push({ name: 'admin' })
    }, 1000)
  } catch (e) {
    messageReactive.destroy()
    window.$message.error('啥也没有！')
  }
}
</script>

<template>
  <n-modal v-model:show="show" preset="card" style="width: 300px" title="输入正确有惊喜：">
    <n-form-item>
      <n-input v-model:value="pad" placeholder="什么东西呢！" @keyup.enter.native="loginClk" />
    </n-form-item>
    <n-form-item label="游客模式" label-placement="left">
      <n-switch v-model:value="active" />
    </n-form-item>

    <n-button type="primary" block secondary strong @click="loginClk"> 确定 </n-button>
  </n-modal>
</template>

<style scoped lang="scss"></style>
