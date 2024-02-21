<template>
  <n-layout has-sider v-once>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      :native-scrollbar="false"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
      style="height: calc(100vh - 64px)"
    >
      <n-menu
        v-model:value="defaultMenu"
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
      />
    </n-layout-sider>
    <n-layout-content class="layout-content" :native-scrollbar="false">
      <main-view />
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts" name="layout-admin">
import type { MenuOption } from 'naive-ui'
import type { AppRouteRecordRaw } from '@/router/types'
import { Ref } from 'vue'
import { admin, adminRouters } from '@/router/admin'
import { RouterLink } from 'vue-router'
import MainView from './components/Mian.vue'

const router = useRouter()
const route = useRoute()

const collapsed = ref(false)
const defaultMenu: Ref<string> = ref('admin-console')

watch(
  route,
  value => {
    defaultMenu.value = value.name as string
  },
  {
    immediate: true
  }
)

/************************ 处理Menu数据 *************************/

const getLabel = (route: AppRouteRecordRaw) => {
  if (route.path.includes('/')) {
    return route.meta.title
  }
  return () =>
    h(
      RouterLink,
      {
        to: {
          name: route.name
        }
      },
      {
        default: () => route.meta.title
      }
    )
}

const conversionRoute = (routers: AppRouteRecordRaw[]): MenuOption[] => {
  return routers.map(item => {
    const menuItem: MenuOption = {
      label: getLabel(item),
      icon: item.meta.icon,
      key: item.name
    }

    if (item?.children) {
      menuItem.children = conversionRoute(item.children)
    }
    return menuItem
  })
}
const menuOptions: MenuOption[] = conversionRoute([admin.children[0]].concat(adminRouters))

// async function init() {
//   const { data } = await getMenu()
//   const dbtables = data.data.map((v: string) => {
//     return v.split(".").pop()
//   })
// }
// init()
</script>

<style lang="scss" scoped>
.layout-content {
  position: relative;
  height: $layout-content;
}
</style>
