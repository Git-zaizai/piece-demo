<template>
	<RouterView v-slot="{ Component, route }">
		<transition :name="viewStore.getTransition.value" mode="out-in" appear>
			<keep-alive v-if="state.keepAliveComponents.length" :include="state.keepAliveComponents">
				<component :is="Component" :key="route.fullPath"/>
			</keep-alive>
			<component v-else :is="Component" :key="route.fullPath"/>
			<!--	    <component :is="Component" :key="route.fullPath"/>-->
		</transition>
	</RouterView>
</template>

<script setup lang="ts" name="Main">
import routers from '@/router/routers'
import { AppRouteRecordRaw } from '@/router/types'
import { useViewStore } from '@/store/modules/useViewStore'

const viewStore = useViewStore()
const state: {
	keepAliveComponents: string[]
} = reactive({
	keepAliveComponents: []
})

function recursion(list: AppRouteRecordRaw[]) {
	for (let i = 0, len = list.length; i < len; i++) {
		const item = list[i]
		if (item?.meta?.keepAlive) {
			state.keepAliveComponents.push(item.meta.keepAlive)
		}
		if (item?.children?.length) {
			recursion(item.children)
		}
	}
}

recursion(routers)
</script>

<style lang="scss" scoped>
.display-enter-active {
	transition: all 0.5s linear;
}

.display-leave-active {
	transition: all 0.5s linear;
	
	.css,
	.html {
		transition: all 0.5s linear;
	}
}

.display-enter-from {
	opacity: 1;
}
</style>
