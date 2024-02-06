<template>
  <h1>test</h1>

  <br />
  <br />
  <br />
  <mdtest />
  <br />
  <br />
  <br />
  <MdLayout></MdLayout>
</template>
<script setup lang="ts">
import mdtest from './tsd.md'
import codeOutline from './CodeOutline.svg'
import MdLayout from './md.vue'

import { useCommonStore } from '@/store/index'
const common = useCommonStore()
const cssVars = computed(() => {
  let vars = {
    '--vp-code-block-bg-light': '#161618',
    '--vp-c-divider': '#e2e2e3'
  }
  if (common.inverted) {
    vars['--vp-code-block-bg-light'] = '#1e1e20'
    vars['--vp-c-divider'] = 'rgba(82, 82, 89, .32)'
  }
  return vars
})

function debounce(fun, wait = 1500) {
  let timeout = null
  return function () {
    if (timeout) {
      //如果存在定时器就清空
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      fun.apply(this, arguments)
    }, wait)
  }
}
const codyMeg = ref('var(--vp-icon-copy)')
let timeout
const butCody = () => {
  codyMeg.value = `var(--vp-icon-copied)`
  timeout && clearTimeout(timeout)
  timeout = setTimeout(() => {
    codyMeg.value = `var(--vp-icon-copy)`
  }, 2000)
}
</script>
<style lang="scss" scoped>
</style>
