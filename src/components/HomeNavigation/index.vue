<template>
  <div class="hc-card-item" v-for="items in props.routeArray" :key="items.name">
    <div class="hc-ci-header">
      <n-tag>
        {{ items.meta.title || '标签' }}
        <template #icon>
          <n-icon :component="ExtensionPuzzleOutline"></n-icon>
        </template>
      </n-tag>
    </div>
    <div class="hc-ci-content">
      <div class="hc-cont-item" v-for="item in items.children" :key="item.name">
        <card-item :route-item="item"/>
      </div>
    </div>
  </div>
</template>

<script name="HomeNavigation" lang="ts" setup>
import CardItem from './CardItem.vue'
import { ExtensionPuzzleOutline } from '@vicons/ionicons5'
import { AppRouteRecordRaw } from '@/router/types'

const props = defineProps<{
  routeArray: Array<AppRouteRecordRaw>
}>()
</script>

<style lang="scss" scoped>
.hc-card-item {
  margin-bottom: 20px;

  /*::v-deep(.n-tag) {
    padding: 0 calc(var(--n-height) / 3) 0 18px;
  }*/

  .hc-ci-content {
    display: flex;
    flex-wrap: wrap;
  }

  .hc-ci-header {
    height: 30px;
  }

  .hc-ci-content {
    padding: 10px 0 0 0;
  }

  .hc-cont-item {
    flex: 1;
    min-width: 171px;
    max-width: 100%;
    transition: all .3s linear;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
