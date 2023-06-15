<script setup lang="ts">
import { Edit32Regular, Delete16Regular } from '@vicons/fluent'

const props = defineProps<{
  upFn: () => void
  delFn: () => void
}>()
</script>

<template>
  <div class="flex-juspb-alc">
    <n-button type="success" ghost size="small" @click="props.upFn()">
      <template #icon>
        <n-icon>
          <Edit32Regular/>
        </n-icon>
      </template>
      EDIT
    </n-button>
    <n-button type="error" ghost size="small" @click="props.delFn()">
      <template #icon>
        <n-icon>
          <Delete16Regular/>
        </n-icon>
      </template>
      DEL
    </n-button>
  </div>
</template>

<style scoped lang="scss">

</style>