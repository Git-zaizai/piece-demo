<template>
  <div class="zai-pull" :style="cssVars">
    <div class="zai-pull-loaderBox">
      <template v-if="ArrowIcon < 3">
        <n-icon
          color="var(--success-color)"
          size="20"
          :component="ArrowDownSharp"
          class="el-transition-200"
          :style="{
            transform: ArrowIcon === 1 ? 'rotate(0deg)' : 'rotate(180deg)'
          }"
        />
        <transition name="fade" mode="out-in" appear>
          <span class="ml-5" v-if="ArrowIcon === 1">下拉</span>
          <span class="ml-5" v-else>放手</span>
        </transition>
      </template>

      <div class="flex-alc" v-else><i class="zai-pull-loader"></i> <span class="ml-5">刷新...</span></div>
    </div>
    <div @scroll="pullScroll" ref="zaiPullRef" class="scroll-y" :class="{ 'hide-scroll': showScrollBar }">
      <slot>
        <div v-for="i in 20">
          啊
          <n-divider />
          啊
        </div>
      </slot>
      <div class="zai-pull-bottom-box">
        <i class="zai-pull-loader"></i>
        <span>{{ bottomBoxStatus ? '加载中...' : '没有更多了' }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDebounceFn, useThrottleFn } from '@vueuse/core'
import { useThemeVars } from 'naive-ui'
import { ArrowDownSharp } from '@vicons/ionicons5'
import type { Ref } from 'vue'

defineOptions({
  name: 'pull-down-to-refresh'
})

interface Props {
  // 是否显示滚动条
  showScrollBar?: boolean
  // 是否开启无限下拉
  InfiniteDropdown?: boolean
  // 下拉刷新回调
  onDropdown?: (fn: () => void) => Promise<void>
  // 开局刷新展示
  initrefresh?: boolean
  // 触底加载回调
  onPullupLoading?: (bottomBoxStatus: Ref<boolean>) => Promise<void>
}

const props = withDefaults(defineProps<Props>(), {
  showScrollBar: false,
  InfiniteDropdown: true,
  initrefresh: false
})

// 最大上拉距离
const DISTANCE_Y_MAX_LIMIT = 70
// 最小上拉距离
const DISTANCE_Y_MIN_LIMIT = 40

let startY = 0,
  startX = 0,
  endY = 0,
  endX = 0,
  distanceY = 0,
  distanceX = 0,
  loadLock = false,
  viewScrollTop = 0,
  viewScrollHeight = 0

const naiveTheme = useThemeVars()
const cssVars = computed(() => {
  return {
    '--success-color': naiveTheme.value.successColor,
    '--border-color': naiveTheme.value.borderColor,
    '--distance-y': distanceYRef.value + 'px'
  }
})

const zaiPullRef = ref<HTMLDivElement | null>(null)

const ArrowIcon = ref<1 | 2 | 3>(1)
const distanceYRef = ref(0)

const overflow = ref<'scroll' | 'hidden'>('scroll')
const bottomBoxStatus = ref(true)

const pullScroll = function (e: any) {
  const { scrollHeight, clientHeight, scrollTop } = e.target
  viewScrollTop = scrollTop
  if (clientHeight + scrollTop >= scrollHeight) {
    if (props.onPullupLoading) {
      overflow.value = 'hidden'
      props.onPullupLoading(bottomBoxStatus).then(() => {
        overflow.value = 'scroll'
      })
    }
  }
}

function start(e: TouchEvent) {
  if (viewScrollTop > 0) {
    return
  }
  if (loadLock) {
    return
  }

  startY = e.touches[0].clientY
  startX = e.touches[0].clientX
}

function move(e: TouchEvent) {
  if (loadLock) {
    return
  }
  if (viewScrollTop > 0) {
    return
  }
  endY = e.touches[0].clientY
  endX = e.touches[0].clientX

  if (endY - startY < 0) {
    return
  }

  distanceY = endY - startY
  distanceX = endX - startX
  const deg = Math.atan(Math.abs(distanceX) / distanceY) * (180 / Math.PI)
  if (deg > DISTANCE_Y_MIN_LIMIT) {
    ;[startY, startX] = [endY, endX]
    return
  }
  let percent = (100 - distanceY * 0.5) / 100
  percent = Math.max(0.5, percent)
  distanceY = distanceY * percent
  if (distanceY > DISTANCE_Y_MAX_LIMIT) {
    ArrowIcon.value = 2
    if (!props.InfiniteDropdown) {
      distanceY = DISTANCE_Y_MAX_LIMIT
    }
  }
  distanceYRef.value = distanceY
  console.log('🚀 ~ move ~ distanceYRef:', distanceYRef.value)
}

const initDropdown = () => {
  loadLock = false
  distanceY = 0
  distanceYRef.value = 0
  ArrowIcon.value = 1
  overflow.value = 'scroll'
  document.querySelector('.n-scrollbar-container').style.overflow = 'scroll'
}
function end() {
  if (viewScrollTop > 0) {
    return
  }
  if (loadLock) {
    return
  }
  if (endY - startY < 0) {
    return
  }
  if (distanceY < DISTANCE_Y_MAX_LIMIT) {
    ArrowIcon.value = 1
    distanceYRef.value = distanceY
    return
  }
  loadLock = true
  ArrowIcon.value = 3
  distanceYRef.value = DISTANCE_Y_MAX_LIMIT
  overflow.value = 'hidden'

  document.querySelector('.n-scrollbar-container').style.overflow = 'hidden'
  if (props.onDropdown) {
    overflow.value = 'hidden'
    props.onDropdown(initDropdown)
  }
}

onMounted(() => {
  const pullDom = zaiPullRef.value
  if (pullDom) {
    pullDom.addEventListener('touchstart', start, { passive: false })
    pullDom.addEventListener('touchmove', move, { passive: false })
    pullDom.addEventListener('touchend', end, { passive: false })
  }
})

onUnmounted(() => {
  const pullDom = zaiPullRef.value
  if (pullDom) {
    pullDom.removeEventListener('touchstart', start)
    pullDom.removeEventListener('touchmove', move)
    pullDom.removeEventListener('touchend', end)
  }
})
</script>
<style scoped lang="scss">
.scroll-y {
  overflow-y: v-bind(overflow);
  height: 100%;
}

@media screen and (max-width: 980px) {
  .zai-pull-web {
    overflow-y: visible;
  }

  .zai-pull {
    height: 100%;
    position: relative;
    transform: translateY(var(--distance-y));

    &-loaderBox {
      position: absolute;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 70px;
      margin-top: -70px;
    }

    &-loader {
      width: 16px;
      height: 16px;
      border: 2px solid var(--border-color);
      border-radius: 50%;
      margin-right: 5px;
      border-bottom: 2px solid var(--success-color);
      animation: loadingskKeyframes 1s linear infinite;
    }

    &-bottom-box {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .hide-scroll::-webkit-scrollbar {
    display: none;
  }

  /* 为了确保内容仍然可以滚动 */
  .hide-scroll {
    -ms-overflow-style: none; /* IE和Edge */
    scrollbar-width: none; /* Firefox */
  }

  /* 可选：如果你想要为其他浏览器（非Webkit）也隐藏滚动条 */
  .hide-scroll {
    overflow: -moz-scrollbars-none; /* Firefox */
  }

  .loading-animation {
    animation: loadingskKeyframes 1s linear infinite;
  }

  @keyframes loadingskKeyframes {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}

.zai-pull-web {
  height: 100%;
  position: relative;
}

.zai-pull-web::-webkit-scrollbar {
  width: var(--n-scrollbar-width);
  height: var(--n-scrollbar-height);
}

.zai-pull-web::-webkit-scrollbar-thumb {
  background-color: var(--n-scrollbar-color);
  border-radius: 10px;
}

.zai-pull-web::-webkit-scrollbar-track {
  border-radius: 10px;
}

.zai-pull-web::-webkit-scrollbar-thumb:hover {
  background: var(--n-scrollbar-color-hover);
  opacity: 0.5;
}
</style>
