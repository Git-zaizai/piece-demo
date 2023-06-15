<template>
  <!--  <WindowPropoerty>-->
  <!--    <lay-out>-->
  <!--      <template #header>-->
  <!--        <layout-header></layout-header>-->
  <!--      </template>-->
  <!--      <template #content>-->
  <!--        <Main/>-->
  <!--      </template>-->
  <!--    </lay-out>-->
  <!--  </WindowPropoerty>-->
  <n-config-provider
    :theme="common.bodyConfigColor.theme"
    :theme-overrides="view.naiveThemeOverrides"
    :locale="zhCN"
  >
    <layout-header />
    <!--    <layout-home v-show="isLayout"/>
        <router-view v-show="!isLayout"/>-->
    <layout-home v-if="isLayout" />
    <router-view v-else />
    <setting-drawer />
  </n-config-provider>
</template>
<script setup lang="ts">
import { zhCN } from "naive-ui"
import { useCommonStore } from "@/store"
import { useViewStore } from "@/store/modules/useViewStore"
import { addThemeCssVarsToHtml } from "@/utils/color"
import { SettingDrawer } from "@/layout/setting-drawer"
import LayoutHeader from "@/layout/layout-header/index.vue"
import LayoutHome from "@/layout/layout-hemo.vue"
import { routeModuleList } from "@/router/routers"
import type { AppRouteRecordRaw } from "@/router/types"

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
  (value) => {
    if (value && value.common) {
      addThemeCssVarsToHtml(value.common, common.inverted)
    } else {
      document.documentElement.style.cssText = ""
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

const routerPaths = ["Root", ...getRouterName(routeModuleList)]
const route = useRoute()
const isLayout = ref(true)
watch(route, (value) => {
  isLayout.value = routerPaths.includes(value.name as string)
})

/*
 console.log('加载条 Loading Bar', window.$loadingBar);
 console.log('对话框 Dialog', window.$dialog);
 console.log('信息 Message', window.$message);
 console.log('通知 Notification', window.$notification);
 */
</script>

<style lang="scss">
@import "./styles/index.scss";
</style>
