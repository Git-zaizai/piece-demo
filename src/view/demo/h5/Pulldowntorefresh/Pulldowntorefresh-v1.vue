<template>
  <div class="zai-pull" :class="{ 'hide-scroll': showScrollBar }" :style="cssVars" ref="zaiPullRef">
    <div class="zai-pull-loaderBox">
      <transition name="fade" mode="out-in" appear>
        <div class="flex-alc" v-if="ArrowIcon === 1">
          <n-icon color="var(--success-color)" size="20" :component="ArrowDown" />
          <span class="ml-5">下拉</span>
        </div>
        <div class="flex-alc" v-else-if="ArrowIcon === 2">
          <n-icon color="var(--success-color)" size="20" :component="ArrowUpOutline" />
          <span class="ml-5">放手</span>
        </div>

        <div class="flex-alc" v-else><i class="zai-pull-loader"></i> <span class="ml-5">刷新...</span></div>
      </transition>
    </div>
    <div class="scroll-y" @scroll="pullScroll">
      <slot>
        <div v-for="i in 20">
          啊
          <n-divider />
          啊
        </div>
      </slot>
    </div>
    <teleport to="body">
      <div class="pull-up-loaderBox" :style="{ '--pull-up-y': pullUpYRef + 'px', ...cssVars }">
        <transition name="fade" mode="out-in" appear>
          <div class="flex-alc" v-if="ArrowIcon === 1">
            <n-icon color="var(--success-color)" size="20" :component="ArrowUpOutline" />
            <span class="ml-5">上拉</span>
          </div>
          <div class="flex-alc" v-else-if="ArrowIcon === 2">
            <n-icon color="var(--success-color)" size="20" :component="ArrowDown" />
            <span class="ml-5">放手</span>
          </div>

          <div class="flex-alc" v-else><i class="pull-up-loader"></i> <span class="ml-5">加载...</span></div>
        </transition>
      </div>
    </teleport>
  </div>
</template>
<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
import { ArrowUpOutline, ArrowDown } from '@vicons/ionicons5'

defineOptions({
  name: 'pull-down-to-refresh-v1'
})

const props = defineProps({
  showScrollBar: {
    type: Boolean,
    default: false
  },
  InfiniteDropdown: {
    type: Boolean,
    default: true
  }
})

// 最大下拉距离
const DISTANCE_Y_MAX_LIMIT = 70
// 最小下拉距离
const DISTANCE_Y_MIN_LIMIT = 40
const PULL_UP_Y_MAX = -100
const PULL_UP_Y_MIN = -50

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
const pullUpYRef = ref(0)

function pullScroll(e: any) {
  const { scrollHeight, clientHeight, scrollTop } = e.target
  viewScrollTop = scrollTop + clientHeight
  if (clientHeight + scrollTop >= scrollHeight) {
  }
}

function start(e: TouchEvent) {
  /*	if (viewScrollTop > 0) {
	 return
	 }*/
  if (loadLock) {
    return
  }
  startY = e.touches[0].clientY
  startX = e.touches[0].clientX
}

function move(e: TouchEvent) {
  /*if (viewScrollTop > 0) {
	 return
	 }*/
  endY = e.touches[0].clientY
  endX = e.touches[0].clientX
  if (loadLock) {
    return
  }
  /*if (endY - startY < 0) {
	 return
	 }*/

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

  if (viewScrollTop === 0 && distanceY > 0) {
    if (distanceY > DISTANCE_Y_MAX_LIMIT) {
      ArrowIcon.value = 2
      if (!props.InfiniteDropdown) {
        distanceY = DISTANCE_Y_MAX_LIMIT
      }
    }
    distanceYRef.value = distanceY
  }

  if (viewScrollTop >= viewScrollHeight && distanceY < 0) {
    if (distanceY < PULL_UP_Y_MAX) {
      ArrowIcon.value = 2
      distanceY = PULL_UP_Y_MAX
    }
    distanceYRef.value = distanceY
    pullUpYRef.value = distanceY
  }
}

function end() {
  /*if (viewScrollTop > 0) {
	 return
	 }*/
  if (loadLock) {
    return
  }
  /*if (endY - startY < 0) {
	 return
	 }*/

  if (viewScrollTop === 0 && distanceY > 0) {
    if (distanceY < DISTANCE_Y_MAX_LIMIT) {
      ArrowIcon.value = 1
      distanceYRef.value = 0
      return
    }
    distanceYRef.value = DISTANCE_Y_MAX_LIMIT
    ArrowIcon.value = 3
    loadLock = true

    setTimeout(() => {
      loadLock = false
      distanceY = 0
      distanceYRef.value = 0
      ArrowIcon.value = 1
    }, 1000)
  }
  if (viewScrollTop >= viewScrollHeight && distanceY < 0) {
    if (distanceY < PULL_UP_Y_MAX) {
      ArrowIcon.value = 1
      pullUpYRef.value = 0
      return
    }
    pullUpYRef.value = PULL_UP_Y_MAX
    distanceYRef.value = PULL_UP_Y_MIN
    loadLock = true
    ArrowIcon.value = 3
    setTimeout(() => {
      loadLock = false
      distanceY = 0
      ArrowIcon.value = 1
      distanceYRef.value = 0
      pullUpYRef.value = 0
    }, 1000)
  }
}

onMounted(() => {
  const pullDom = zaiPullRef.value
  if (pullDom) {
    pullDom.addEventListener('touchstart', start, { passive: false })
    pullDom.addEventListener('touchmove', move, { passive: false })
    pullDom.addEventListener('touchend', end, { passive: false })
    viewScrollHeight = pullDom.scrollHeight + pullDom.clientHeight - 90
    console.log('🚀 ~ onMounted ~ viewScrollHeight:', viewScrollHeight)
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
  overflow-y: scroll;
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
  }

  .pull-up-loaderBox {
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: -50px;
    left: 0;
    height: 50px;
    transform: translateY(var(--pull-up-y));
  }
  .pull-up-loader {
    width: 16px;
    height: 16px;
    border: 2px solid var(--border-color);
    border-radius: 50%;
    margin-right: 5px;
    border-bottom: 2px solid var(--success-color);
    animation: loadingskKeyframes 1s linear infinite;
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
