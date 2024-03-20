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
      <slot></slot>
      <div class="hitBottom-loaderBox" v-if="bottomLoading">
        <transition name="fade" mode="out-in" appear>
          <div class="flex-alc" v-if="hitBottomShowNull">
            <span class="ml-5">没有更多了</span>
          </div>
          <div class="flex-alc" v-else><i class="pull-up-loader"></i> <span class="ml-5">加载...</span></div>
        </transition>
      </div>
      <div class="hitBottom-loaderBox flex-alc" v-if="pullup.iconStatus === 4">
        <span class="ml-5">没有更多了</span>
      </div>
    </div>

    <teleport to="body" v-if="!bottomLoading">
      <div class="pull-up-loaderBox" :style="{ '--pull-up-y': pullup.y + 'px', ...cssVars }">
        <transition name="fade" mode="out-in" appear>
          <div class="flex-alc" v-if="pullup.iconStatus < 3">
            <n-icon
              color="var(--success-color)"
              size="20"
              :component="ArrowUpOutline"
              class="el-transition-200"
              :class="pullup.iconStatus === 2 ? 'rotate--180' : 'rotate-0'"
            />
            <span class="ml-5">{{ pullup.text }}</span>
          </div>
          <div class="flex-alc" v-else-if="pullup.iconStatus === 3">
            <i class="pull-up-loader"></i> <span class="ml-5">加载...</span>
          </div>
          <div class="flex-alc" v-else-if="pullup.iconStatus === 4">没有更多了</div>
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
  loadLock = true,
  // 滚动距离
  viewScrollTop = 0,
  // 滚动高度
  viewScrollHeight = 0,
  // 手指按下时的滚动距离
  startPullUpScrollTop = 0

interface Props {
  // 是否隐藏滚动条
  showScrollBar?: boolean
  // 无限下拉（上拉）
  InfiniteDropdown?: boolean
  // 开启触底加载  true 触底 false 上拉
  bottomLoading?: boolean
  // 下拉刷新回调
  onDown: (fn: () => void) => void | Promise<void>
  // 触底加载与上拉加载回调
  onPull: (fn: (status: number) => void) => void | Promise<void>
}

const props = withDefaults(defineProps<Props>(), {
  showScrollBar: false,
  InfiniteDropdown: true,
  bottomLoading: false
})

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

// 下拉刷新
interface Down {
  // 三个状态  1 正在下拉 2 到达放手区域 3 刷新中
  iconStatus: 1 | 2 | 3
  text: '下拉' | '放手'
}

const downRef = ref<Down>({
  iconStatus: 1,
  text: '下拉'
})

// 上拉加载
interface PullUp {
  // 上拉距离
  y: number
  // 四个状态  1 正在上拉 2 到达放手区域 3 加载中 4 没有更多了
  iconStatus: 1 | 2 | 3 | 4
  //
  text: '上拉' | '放手'
}
const pullup = ref<PullUp>({
  y: 0,
  iconStatus: 1,
  text: '上拉'
})

// 触底加载
const hitBottomShowNull = ref(false)

function hitBottomCallback(value: number = 1) {
  hitBottomShowNull.value = value === 4
}

function pullScroll(e: any) {
  const { scrollHeight, clientHeight, scrollTop } = e.target
  viewScrollTop = scrollTop
  if (props.bottomLoading && !hitBottomShowNull.value && viewScrollTop >= scrollHeight) {
    props.onPull && props.onPull(hitBottomCallback)
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

  const { scrollTop, clientHeight } = scrollYRef.value
  startPullUpScrollTop = scrollTop + clientHeight
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

  /**
   * if
   *  判断滚动条道顶部
   *  判断方向为 正数 下拉
   *
   */
  console.log(viewScrollTop, distanceY)
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

  /**
   *
   * if
   * 	判断是否开启了上拉加载
   * 	判断手指摁下时 滚动距离是不是到达了底部
   * 	判断是否数据没有 4 状态表示没有更多了
   * 	判断当前滚动距离是否 >= 可滚动距离
   * 	判断方向为 负数 负数为上拉
   *
   *
   * **/

  if (
    !props.bottomLoading &&
    startPullUpScrollTop >= viewScrollHeight &&
    pullup.value.iconStatus !== 4 &&
    viewScrollTop >= viewScrollHeight &&
    distanceY < 0
  ) {
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

    if (props.onDown) {
      props.onDown(downCallback)
    } else {
      setTimeout(() => {
        downCallback()
      }, 2000)
    }
  }

  /**
   *
   * if
   * 	判断是否开启了上拉加载
   * 	判断手指摁下时 滚动距离是不是到达了底部
   * 	判断是否数据没有 4 状态表示没有更多了
   * 	判断当前滚动距离是否 >= 可滚动距离
   * 	判断方向为 负数 负数为上拉
   *
   *
   * **/

  if (
    !props.bottomLoading &&
    startPullUpScrollTop >= viewScrollHeight &&
    pullup.value.iconStatus !== 4 &&
    viewScrollTop >= viewScrollHeight &&
    distanceY < 0
  ) {
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

    if (props.onPull) {
      props.onPull(pullCallback)
    } else {
      setTimeout(() => {
        pullCallback()
      }, 2000)
    }
  }
}

function downCallback() {
  loadLock = false
  distanceY = 0
  distanceYRef.value = 0

  downRef.value = {
    iconStatus: 1,
    text: '下拉'
  }
}

function pullCallback(status: 1 | 2 | 3 | 4 = 1) {
  loadLock = false
  distanceY = 0
  distanceYRef.value = 0
  pullup.value = {
    y: 0,
    iconStatus: status,
    text: '上拉'
  }
}

// 使用 MutationObserver 来监听插槽内容的变化
const observer = new MutationObserver(() => {
  nextTick(() => {
    loadLock = false
    viewScrollHeight = scrollYRef.value.scrollHeight
  })
})

onMounted(() => {
  const pullDom = zaiPullRef.value
  if (pullDom) {
    pullDom.addEventListener('touchstart', start, { passive: false })
    pullDom.addEventListener('touchmove', move, { passive: false })
    pullDom.addEventListener('touchend', end, { passive: false })
    observer.observe(scrollYRef.value as HTMLDivElement, {
      childList: true, // 观察子节点的变化
      subtree: true // 观察整个子树
    })
    onDownMoutd()
  }
})

// 初始化自动加载第一次刷新
function onDownMoutd() {
  setTimeout(() => {
    distanceYRef.value = 80
  }, 500)
  setTimeout(() => {
    downRef.value = {
      iconStatus: 3,
      text: '放手'
    }
  }, 700)
  setTimeout(() => {
    if (props.onDown) {
      props.onDown(downCallback)
    }
  }, 700)
}

onUnmounted(() => {
  const pullDom = zaiPullRef.value
  if (pullDom) {
    pullDom.removeEventListener('touchstart', start)
    pullDom.removeEventListener('touchmove', move)
    pullDom.removeEventListener('touchend', end)
    observer.disconnect()
  }
})
</script>
<style scoped lang="scss">
.el-transition-200 {
  transition: all 0.2s linear;
}

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

  .hitBottom-loaderBox {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
  }

  .pull-up-loaderBox {
    position: fixed;
    background-color: rgba(250, 250, 252, 1);
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
