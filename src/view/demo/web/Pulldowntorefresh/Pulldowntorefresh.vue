<template>
	<div class="zai-Pulldowntorefresh">
		<div class="zai-loaderBox" :style="cssVars">
			<i class="zai--loader"></i>
		</div>
	</div>
</template>
<script setup lang="ts">
defineOptions({
	name: 'Pulldowntorefresh'
})

const cssVars = ref({
	'--loader-y': 0
})
</script>
<style scoped lang="scss">
.zai-Pulldowntorefresh {
  --loader-y: 0;

  height: calc(100vh - 80px - 60px);
  position: relative;
  overflow: scroll;

  &-loaderBox {
    position: relative;
    top: -80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
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
