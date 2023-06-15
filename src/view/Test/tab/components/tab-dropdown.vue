<template>
  <n-dropdown trigger="manual"
              :options="options"
              :show="dropdownVisible"
              :x="props.x"
              :y="props.y"
              placement="bottom"
              @select="select"
              @clickoutside="hide">
  </n-dropdown>
</template>

<script name="tab-dropdown" setup lang="ts">
import {
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

const props = defineProps<{
  x: number
  y: number
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', visible: boolean): void
  (e: 'downClick', key: number, label: string): void
}>()


const dropdownVisible = computed({
  get() {
    return props.show
  },
  set(visible: boolean) {
    emit('update:show', visible)
  }
})

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

function select(key, option) {
  emit('downClick', key, option.label)
}

function hide() {
  console.log('asdhjkaslhdk', props.show)
  dropdownVisible.value = false;
}
</script>

<style lang="scss" scoped>

</style>