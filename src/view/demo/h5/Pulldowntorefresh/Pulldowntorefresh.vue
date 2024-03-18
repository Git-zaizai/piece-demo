<template>
  <div class="zai-pull" :class="{ 'hide-scroll': showScrollBar }" :style="cssVars" ref="zaiPullRef">
    <div class="zai-pull-loaderBox">
      <transition name="fade" mode="out-in" appear>
        <div class="flex-alc" v-if="downRef.iconStatus < 3">
          <n-icon
            color="var(--success-color)"
            size="20"
            :component="ArrowDown"
            class="el-transition-200"
            :class="downRef.iconStatus === 1 ? 'rotate-0' : 'rotate-180'"
          />
          <span class="ml-5">{{ downRef.text }}</span>
        </div>
        <div class="flex-alc" v-else><i class="zai-pull-loader"></i> <span class="ml-5">刷新...</span></div>
      </transition>
    </div>
    <div class="scroll-y" @scroll="pullScroll" ref="scrollYRef">
      <slot> </slot>
    </div>

    <teleport to="body">
      <div class="pull-up-loaderBox" :style="{ '--pull-up-y': pullup.y + 'px', ...cssVars }">
        <transition name="fade" mode="out-in" appear>
          <div class="flex-alc" v-if="pullup.iconStatus < 3">
            <n-icon
              color="var(--success-color)"
              size="20"
              :component="ArrowUpOutline"
              class="el-transition-200"
              :class="pullup.iconStatus === 1 ? 'rotate-0' : 'rotate--180'"
            />
            <span class="ml-5">{{ pullup.text }}</span>
          </div>
          <div class="flex-alc" v-else>
            <i class="pull-up-loader"></i>
            <span class="ml-5">加载...</span>
          </div>
        </transition>
      </div>
    </teleport>
  </div>
</template>
<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
import { ArrowUpOutline, ArrowDown } from '@vicons/ionicons5'

defineOptions({
  name: 'pull-down-to-refresh'
})

interface Props {
  showScrollBar?: boolean
  InfiniteDropdown?: boolean
  onDown: () => void | Promise<void>
  onPull: () => void | Promise<void>
}

const props = withDefaults(defineProps<Props>(), {
  showScrollBar: false,
  InfiniteDropdown: true
})

// 最大下拉距离
const DISTANCE_Y_MAX_LIMIT = 100
// 最小下拉距离
const DISTANCE_Y_MIN_LIMIT = 70
// 最大上拉距离
const PULL_UP_Y_MAX = -100
// 最小下拉距离
const PULL_UP_Y_MIN = -70

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
const scrollYRef = ref<HTMLDivElement | null>(null)
const distanceYRef = ref(0)
const downRef = ref({
  iconStatus: 1,
  text: '下拉'
})
const pullup = ref({
  y: 0,
  iconStatus: 1,
  text: '上拉'
})

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
    if (distanceY > DISTANCE_Y_MIN_LIMIT) {
      downRef.value = {
        iconStatus: 2,
        text: '放手'
      }
      if (!props.InfiniteDropdown) {
        distanceY = DISTANCE_Y_MAX_LIMIT
      }
    }
    distanceYRef.value = distanceY
  }

  if (viewScrollTop >= viewScrollHeight && distanceY < 0) {
    if (distanceY < PULL_UP_Y_MIN) {
      pullup.value.iconStatus = 2
      pullup.value.text = '放手'
      if (!props.InfiniteDropdown) {
        distanceY = PULL_UP_Y_MAX
      }
    }
    distanceYRef.value = distanceY
    pullup.value.y = distanceY
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
    if (distanceY < DISTANCE_Y_MIN_LIMIT) {
      downRef.value = {
        iconStatus: 1,
        text: '下拉'
      }
      distanceYRef.value = 0
      return
    }

    distanceYRef.value = DISTANCE_Y_MIN_LIMIT
    downRef.value.iconStatus = 3
    loadLock = true

    setTimeout(() => {
      loadLock = false
      distanceY = 0
      distanceYRef.value = 0

      downRef.value = {
        iconStatus: 1,
        text: '下拉'
      }
    }, 1200)
  }
  if (viewScrollTop >= viewScrollHeight && distanceY < 0) {
    if (distanceY > PULL_UP_Y_MIN) {
      pullup.value = {
        y: 0,
        iconStatus: 1,
        text: '上拉'
      }
      distanceYRef.value = 0
      return
    }

    loadLock = true
    distanceYRef.value = PULL_UP_Y_MIN
    pullup.value.iconStatus = 3
    pullup.value.y = PULL_UP_Y_MIN
    setTimeout(() => {
      loadLock = false
      distanceY = 0
      distanceYRef.value = 0
      pullup.value = {
        y: 0,
        iconStatus: 1,
        text: '上拉'
      }
    }, 2000)
  }
}

// 初始化MutationObserver来监听插槽内容的变化
const observer = new MutationObserver(() => {
  nextTick(() => {
    const pullDom = zaiPullRef.value
    viewScrollHeight = pullDom.scrollHeight + pullDom.clientHeight
  })
})

onMounted(() => {
  const pullDom = zaiPullRef.value
  if (pullDom) {
    pullDom.addEventListener('touchstart', start, { passive: false })
    pullDom.addEventListener('touchmove', move, { passive: false })
    pullDom.addEventListener('touchend', end, { passive: false })
    viewScrollHeight = pullDom.scrollHeight + pullDom.clientHeight
    observer.observe(scrollYRef.value as HTMLDivElement, {
      childList: true, // 观察子节点的变化
      subtree: true // 观察整个子树
    })
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
  .rotate-0 {
    transform: rotate(0deg);
  }

  .rotate-180 {
    transform: rotate(180deg);
  }
  .rotate--180 {
    transform: rotate(-180deg);
  }

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
    bottom: -70px;
    left: 0;
    height: 70px;
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
