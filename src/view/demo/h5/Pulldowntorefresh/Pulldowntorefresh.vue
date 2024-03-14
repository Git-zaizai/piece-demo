<template>
	<div class="zai-pull" :class="showScrollBar && 'hide-scroll'" @scroll="pullScroll" :style="cssVars" ref="zaiPullRef">
		<div class="zai-pull-loaderBox">
			<i class="zai-pull-loader"></i>
		</div>
		<div>
			<slot>
				<div v-for="i in 20">
					啊
					<n-divider />
					啊
				</div>
			</slot>
		</div>
	</div>
</template>
<script setup lang="ts">
defineOptions({
	name: 'pull-down-to-refresh'
})

const props = defineProps({
	showScrollBar: {
		type: Boolean,
		default: false
	}
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

const cssVars = ref({
	'--loader-y': 0
})

const zaiPullRef = ref<HTMLDivElement | null>(null)

function pullScroll(e: any) {
	const { scrollHeight, clientHeight, scrollTop } = e.target
	viewScrollTop = scrollTop
	if (clientHeight + scrollTop >= scrollHeight - 100) {

	}
}

function start() {

}

function move() {

}

function end() {

}

onMounted(() => {
	const pullDom = zaiPullRef.value
	if (pullDom) {
		pullDom.addEventListener('touchstart', start, { passive: false })
		pullDom.addEventListener('touchmove', move, { passive: false })
		pullDom.addEventListener('touchend', end, { passive: false })
		viewScrollHeight = pullDom.scrollHeight
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
.zai-pull {
  height: 100%;
  position: relative;
  overflow: scroll;

  &-loaderBox {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0px;
  }

  &-loader {
    width: 25px;
    height: 25px;
    border: 3px solid var(--border-color);
    border-radius: 50%;
    border-bottom: 3px solid var(--success-color);
    transform: translateY(var(--loader-y));
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
</style>
