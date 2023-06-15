<template>
  <div class="color-checkbox flex-fdc-alc-juc"
       :style="{ backgroundColor: props.color,width:props.width,height:props.height }">
    <n-icon color="#fff" v-if="props.color === props.themeColor">
      <IosBrush/>
    </n-icon>
  </div>
</template>

<script name="color-checkbox" setup lang="ts">
import { IosBrush } from '@vicons/ionicons4'

interface Props {
  width?: string
  height?: string
  /** 颜色 */
  color: string
  themeColor: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '20px',
  height: '20px'
})
</script>

<style lang="scss" scoped>
.color-checkbox {
  border-radius: 2px;
  cursor: pointer;
  width: 20px;
  height: 20px;
}
</style>