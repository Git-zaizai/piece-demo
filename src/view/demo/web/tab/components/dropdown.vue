<template>
  <n-dropdown :options="options" trigger="click">
    <n-button style="width:150px;margin-top: 20px">菜单-基础样式</n-button>
  </n-dropdown>
</template>

<script name="dropdown" setup lang="ts">
import {
  DownOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  CloseOutlined,
  ColumnWidthOutlined,
  MinusOutlined,
  LeftOutlined,
  RightOutlined,
} from '@vicons/antd';
import { NIcon } from 'naive-ui'
import { Component } from 'vue'

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}


const options = [
  {
    label: '内容全屏',
    key: '0',
    icon: renderIcon(FullscreenOutlined)
  },
  {
    label: '刷新当前',
    key: '1',
    icon: renderIcon(ReloadOutlined)
  },
  {
    label: '关闭当前',
    key: '2',
    icon: renderIcon(CloseOutlined)
  },
  {
    label: '关闭其他',
    key: '3',
    icon: renderIcon(ColumnWidthOutlined)
  },
  {
    label: '关闭左侧',
    key: '4',
    icon: renderIcon(LeftOutlined)
  },
  {
    label: '关闭右侧',
    key: '5',
    icon: renderIcon(RightOutlined)
  },
  {
    label: '关闭全部',
    key: '6',
    icon: renderIcon(MinusOutlined)
  },
]
</script>

<style lang="scss" scoped>

</style>