<template>
	<n-layout-content class="layout-content" :native-scrollbar="false">
		<main-view/>
	</n-layout-content>
</template>

<script lang="ts" setup name="layout-home">
import MainView from './components/Mian.vue'
</script>

<style lang="scss" scoped>
.layout-content {
	position: relative;
	height: $layout-content;
}

/*.layout {
  display: flex;
  flex-direction: row;
  flex: auto;
}*/
</style>
