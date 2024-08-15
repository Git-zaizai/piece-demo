<template>
  <n-config-provider :theme="common.bodyConfigColor.theme" :theme-overrides="view.naiveThemeOverrides" :locale="zhCN">
    <layout-header />
    <component :is="isLayout ? LayoutHome : RouterView" />
    <setting-drawer />
  </n-config-provider>
</template>
<script setup lang="ts">
import { zhCN } from 'naive-ui'
import { useCommonStore } from '@/store'
import { useViewStore } from '@/store/modules/useViewStore'
import { addThemeCssVarsToHtml } from '@/utils/color'
import { SettingDrawer } from '@/layout/setting-drawer'
import LayoutHeader from '@/layout/layout-header/index.vue'
import LayoutHome from '@/layout/layout-hemo.vue'
import { routeModuleList } from '@/router/routers'
import type { AppRouteRecordRaw } from '@/router/types'
import { RouterView } from 'vue-router'

const view = useViewStore()
const common = useCommonStore()

if (common.constantInverted) {
  common.getinverted(common.inverted)
} else {
  if (new Date().getHours() + 1 > 7 && new Date().getHours() + 1 < 19) {
    common.getinverted(false)
  } else {
    common.getinverted(true)
  }
}

watch(
  () => view.naiveThemeOverrides,
  value => {
    if (value && value.common) {
      addThemeCssVarsToHtml(value.common, common.inverted)
    } else {
      document.documentElement.style.cssText = ''
    }
  },
  { immediate: true }
)

function getRouterName(routes: AppRouteRecordRaw[]): string[] {
  const res = []
  for (let i = 0; i < routes.length; i++) {
    res.push(routes[i].name)
    if (routes[i].children) {
      res.push(...getRouterName(routes[i].children))
    }
  }
  return res
}

const routerPaths = ['Root', ...getRouterName(routeModuleList)]
// const routerPaths = []
const route = useRoute()
const isLayout = ref(true)
watch(route, value => {
  isLayout.value = routerPaths.includes(value.name as string)
})
</script>

<style lang="scss">
@import './styles/index';
@import './styles/styles/press.css';
</style>
