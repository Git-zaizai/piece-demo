<template>
  <h1>test</h1>

  <br />
  <br />
  <br />
  <div class="zai-code" :style="cssVars">
    <button class="zai-but-copy" @click="butCody"></button>
    <span class="lang"> lang </span>
    <!-- <div class="view-svg-group">
      <div class="view-svg" title="Check Code">
        <svg class="svg" viewBox="0 0 544 560" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M399.503 143.667C399.319 152.501 406.332 159.812 415.167 159.997C424.001 160.181 431.312 153.168 431.497 144.333L399.503 143.667ZM416 120L431.997 120.333C431.999 120.207 432 120.081 432 119.954L416 120ZM360 64L360.046 48.0001C360.03 48 360.015 48 360 48L360 64ZM144 64V48C143.984 48 143.968 48 143.953 48.0001L144 64ZM80 128L64.0001 127.953C64 127.968 64 127.984 64 128L80 128ZM80 344H64C64 344.015 64 344.03 64.0001 344.046L80 344ZM136 400L135.954 416C135.97 416 135.985 416 136 416L136 400ZM160 416C168.837 416 176 408.837 176 400C176 391.163 168.837 384 160 384V416ZM217 160H439V128H217V160ZM439 160C461.644 160 480 178.356 480 201H512C512 160.683 479.317 128 439 128V160ZM480 201V423H512V201H480ZM480 423C480 445.644 461.644 464 439 464V496C479.317 496 512 463.317 512 423H480ZM439 464H217V496H439V464ZM217 464C194.356 464 176 445.644 176 423H144C144 463.317 176.683 496 217 496V464ZM176 423V201H144V423H176ZM176 201C176 178.356 194.356 160 217 160V128C176.683 128 144 160.683 144 201H176ZM431.497 144.333L431.997 120.333L400.003 119.667L399.503 143.667L431.497 144.333ZM432 119.954C431.946 100.888 424.347 82.6173 410.865 69.1349L388.238 91.7624C395.741 99.2658 399.97 109.434 400 120.046L432 119.954ZM410.865 69.1349C397.383 55.6526 379.112 48.0543 360.046 48.0001L359.954 79.9999C370.566 80.0301 380.734 84.2589 388.238 91.7624L410.865 69.1349ZM360 48H144V80H360V48ZM143.953 48.0001C122.767 48.0627 102.467 56.5064 87.4868 71.4868L110.114 94.1142C119.117 85.1118 131.316 80.0376 144.047 79.9999L143.953 48.0001ZM87.4868 71.4868C72.5064 86.4673 64.0627 106.767 64.0001 127.953L95.9999 128.047C96.0376 115.316 101.112 103.117 110.114 94.1142L87.4868 71.4868ZM64 128V344H96V128H64ZM64.0001 344.046C64.0543 363.112 71.6526 381.383 85.1349 394.865L107.762 372.238C100.259 364.734 96.0301 354.566 95.9999 343.954L64.0001 344.046ZM85.1349 394.865C98.6173 408.347 116.888 415.946 135.954 416L136.046 384C125.434 383.97 115.266 379.741 107.762 372.238L85.1349 394.865ZM136 416H160V384H136V416Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div class="view-svg" title="Copy Code">
        <svg
          class="svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M160 368L32 256l128-112"
          ></path>
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M352 368l128-112l-128-112"
          ></path>
        </svg>
      </div>
    </div> -->
    <pre
      class="shiki shiki-themes one-dark-pro one-dark-pro"
      style="background-color: #282c34; --shiki-dark-bg: #282c34; color: #abb2bf; --shiki-dark: #abb2bf"
      tabindex="0"
    ><code class="language-vue"><span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">&lt;</span><span style="color:#E06C75;--shiki-dark:#E06C75;">script</span><span style="color:#D19A66;--shiki-dark:#D19A66;"> setup</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#C678DD;--shiki-dark:#C678DD;">import</span><span style="color:#E06C75;--shiki-dark:#E06C75;"> MdTest</span><span style="color:#C678DD;--shiki-dark:#C678DD;"> from</span><span style="color:#98C379;--shiki-dark:#98C379;"> '@/components/md-test.vue'</span></span>
<span class="line"><span style="color:#C678DD;--shiki-dark:#C678DD;">import</span><span style="color:#E06C75;--shiki-dark:#E06C75;"> space</span><span style="color:#C678DD;--shiki-dark:#C678DD;"> from</span><span style="color:#98C379;--shiki-dark:#98C379;"> '../space.vue'</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">&lt;/</span><span style="color:#E06C75;--shiki-dark:#E06C75;">script</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">&lt;</span><span style="color:#E06C75;--shiki-dark:#E06C75;">MdTest</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">&gt;&lt;/</span><span style="color:#E06C75;--shiki-dark:#E06C75;">MdTest</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">&lt;</span><span style="color:#E06C75;--shiki-dark:#E06C75;">spac</span><span style="color:#D19A66;--shiki-dark:#D19A66;">e</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">/&gt;</span></span>
<span class="line"></span></code></pre>
  </div>

  <br />
  <br />
  <br />
  <MdLayout></MdLayout>
</template>
<script setup lang="ts">
// import mdtest from './tsd.md'
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
  --vp-c-text-dark-3: rgba(235, 235, 245, .38);
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
