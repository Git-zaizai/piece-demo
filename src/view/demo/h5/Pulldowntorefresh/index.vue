<template>
	<div class="pull">
		<pull-down-to-refresh :onDropdown="dropdown" :onPullupLoading="onPullupLoading">
			<n-list hoverable clickable>
				<n-list-item v-for="(item, index) in list" :key="index">
					{{ item.text }}
				</n-list-item>
			</n-list>
		</pull-down-to-refresh>
	</div>
</template>
<script setup lang="ts">
import PullDownToRefresh from './Pulldowntorefresh.vue'

defineOptions({
	name: 'Pulldowntorefresh'
})

const createData = (len = 10, time = 1500) => {
	return new Promise(resolve => {
		setTimeout(() => {
			let data = Array.from({ length: len }).map(() => {
				return {
					text: Math.random().toString(36).slice(2, 12)
				}
			})
			resolve(data)
		}, time)
	})
}
const list = ref<Array<{ text: string }>>([])
createData(50).then((data: any) => {
	list.value = list.value.concat(data)
})

const dropdown = (fn: Function) => {
	return createData(10, 1500).then((data: any) => {
		list.value = list.value.concat(data)
		fn()
	})
}
const onPullupLoading = (valueRef: any) => {
	console.log('山旮旯')

	return createData(2, 3000).then((data: any) => {
		list.value = list.value.concat(data)
		valueRef.value = false
	})
}
</script>
<style scoped lang="scss">
.pull {
  height: calc(100vh - (64px));
}
</style>
