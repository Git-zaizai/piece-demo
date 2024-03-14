<template>
	<div class="pull">
		<pull-down-to-refresh />
	</div>
</template>
<script setup lang="ts">
import PullDownToRefresh from './Pulldowntorefresh.vue'

defineOptions({
	name: 'Pulldowntorefresh'
})


</script>
<style scoped lang="scss">
.pull {
  height: calc(100vh - 65px);
}

</style>
