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
.zai-code {
  width: calc(100% - 20px);
  position: relative;
  padding: 0 10px;

  &:hover .zai-but-copy {
    opacity: 1;
  }
  &:hover .lang {
    opacity: 0;
  }
  --vp-icon-copy: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2'/%3E%3C/svg%3E");
  --vp-icon-copied: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4'/%3E%3C/svg%3E");
  --vp-c-text-dark-3: rgba(235, 235, 245, 0.38);
}

.zai-but-copy {
  direction: ltr;
  position: absolute;
  top: 12px;
  right: 24px;
  z-index: 3;
  border: 1px solid;
  border-color: transparent;
  border-radius: 4px;
  width: 40px;
  height: 40px;
  background-color: var(--vp-code-block-bg-light);
  opacity: 0;
  cursor: pointer;
  background-image: v-bind(codyMeg);
  background-position: 50%;
  background-size: 20px;
  background-repeat: no-repeat;
  transition: border-color 0.25s, background-color 0.25s, opacity 0.25s;

  &:hover {
    border-color: var(--vp-c-divider);
    background-color: var(--vp-code-block-bg-light);
  }
}

.zai-code pre {
  padding: 20px 24px;
  border-radius: 8px;
}

.view-svg-group {
  position: absolute;
  right: 5px;
  top: 5px;
  display: none;
  align-items: center;
}
.view-svg {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin-left: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--vp-code-block-bg-light);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2'/%3E%3C/svg%3E");
  transition: border-color 0.2s linear, color 0.2s linear;
  color: rgba(255, 255, 255, 0.3);
  border: 1px solid;
  border-color: transparent;
  cursor: pointer;

  &:hover {
    // background-color: rgba(255, 255, 255, 0.8);
    border-color: rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 1);
  }
}

.svg {
  height: 1em;
  width: 1em;
}

.lang {
  position: absolute;
  top: 6px;
  right: 22px;
  z-index: 2;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-dark-3);
  transition: color 0.4s, opacity 0.4s;
}
</style>
