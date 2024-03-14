<template>
	<div class="vue-order demo-view">
		<div>
			<div>
				<h4>相同组件</h4>
				<n-button @click="createAppFn">createApp 创建</n-button>
				<n-button @click="() => hFn()">h 创建</n-button>
				<n-button @click="() => createVNodeFn()">createVNode 创建</n-button>
			</div>
			<div id="vue-render" class="mt-20"></div>
			<div id="vue-render1" class="mt-20"></div>
			<div id="vue-render2" class="mt-20"></div>
		</div>
		<p>结论：如果只是简单的创建组件随便用，性能差不多</p>
		<div>
			<div class="mt-20">
				<h4>不同组件</h4>
				<n-button @click="() => createAppFn1()">createApp 创建</n-button>
				<n-button @click="() => hFn2()">h 创建</n-button>
				<n-button @click="() => createVNodeFn3()">createVNode 创建</n-button>
			</div>
			<div id="vue-render-1" class="mt-20"></div>
			<div id="vue-render-2" class="mt-20"></div>
			<div id="vue-render-3" class="mt-20"></div>
		</div>
		<vueRenDerMd />
	</div>
</template>
<script setup lang="ts">
import { createAppFn, hFn, createVNodeFn, createAppFn1, hFn2, createVNodeFn3 } from './order'
import vueRenDerMd from './vue-render.md'
</script>
<style scoped lang="scss">
.vue-order {
  display: flex;
  justify-content: space-between;
}
</style>
