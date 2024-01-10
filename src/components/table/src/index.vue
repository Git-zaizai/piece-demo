<script setup lang="ts" name="zai-table">
import { useThemeVars, NButton } from 'naive-ui'
import type { DataTableColumns, DataTableColumn } from 'naive-ui'
import type { Ref } from 'vue'

import { Add, ReorderTwoOutline } from '@vicons/ionicons5'
import { Refresh } from '@vicons/tabler'
import { ColumnHeightOutlined, SettingOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@vicons/antd'

import useIsClass from '@/hooks/use-is-class'
import { useToggle } from '@vueuse/core'
import Actions from './components/actions.vue'
import { getScrollX } from './utils'
import { ZaiTableProps } from './props'
import { ref } from 'vue'

const props = defineProps({
  ...ZaiTableProps
})

const emit = defineEmits<{
  (e: 'update-item', row: any, rowIndex: number)
  (e: 'del-item', row: any, rowIndex: number)
  (e: 'checkbox-change', keys: Array<string | number>, rows: [], meta: { action: string; row: any })
  (e: 'add')
  (e: 'flushed')
}>()

const dataTableRef = ref()

// columns 处理
const getColumns = (
  checkbox: boolean,
  columns: DataTableColumns,
  actionsColumns: DataTableColumn
): DataTableColumns => {
  let res = null
  if (checkbox) {
    res = ([{ type: 'selection', fixed: 'left' }] as any[]).concat(columns)
  } else {
    res = columns
  }
  if (!actionsColumns) {
    res.push({
      title: '操作',
      key: 'actions_0',
      fixed: 'right',
      width: 200,
      render(row, rowIndex) {
        return h(Actions, {
          upFn: () => emit('update-item', row, rowIndex),
          delFn: () => emit('del-item', row, rowIndex)
        })
      }
    })
  } else {
    res.push(actionsColumns)
  }
  return res
}
const tableColumns = computed(() => {
  return getColumns(props.checkbox, props.columns, props.actionsColumns)
})

// 组件颜色
const naiveCssVars = useThemeVars()
const cssVars = computed(() => ({
  '--n-color': naiveCssVars.value.cardColor,
  '--n-text-color-hover': naiveCssVars.value.primaryColorHover,
  '--n-text-color': naiveCssVars.value.successColor,
  '--n-text': naiveCssVars.value.textColor2
}))

// 表格内容的横向宽度，如果列被水平固定了，则需要设定它
const scroll_x = computed(() => getScrollX(props.columns, props.scrollX, props.actionsColumns))

// 斑马纹
const { bool: striped, name, toggle } = useIsClass('zai-header_true')

// 密度
const densityOptions = [
  {
    type: 'menu',
    label: '紧凑',
    key: 'small'
  },
  {
    type: 'menu',
    label: '默认',
    key: 'medium'
  },
  {
    type: 'menu',
    label: '宽松',
    key: 'large'
  }
]
const tableSize: Ref<'small' | 'medium' | 'large'> = ref('medium')
const densitySelect = (key: 'small' | 'medium' | 'large') => {
  tableSize.value = key
}

// 全屏
const [bool, toggleFu] = useToggle()

// 列设置
const lieFn = () => {
  window.$message.info('还没搞')
}

// 分页设置
const paginationReactive = reactive<any>(
  Object.assign(
    {
      page: 1,
      pageSize: 10,
      showSizePicker: true,
      pageSizes: [10, 20, 30, 50, 100],
      showQuickJumper: true,
      onChange: (page: number) => {
        paginationReactive.page = page
      },
      onUpdatePageSize: (pageSize: number) => {
        paginationReactive.pageSize = pageSize
        paginationReactive.page = 1
      },
      prefix: ({ itemCount }) => {
        return `共 ${itemCount} 项`
      }
    },
    props.pagination
  )
)

// row-key 这个的作用是 如果表格使用了多选框 要么设置这个  要么在data里面有 key 这个字段
const getRowKey = (row): string | number => {
  return row[props.checkboxKey]
}

// 选择 多选按钮 回调
const checkboxChange = (
  keys: Array<string | number>,
  rows: [],
  meta: { row: any; action: 'check' | 'uncheck' | 'checkAll' | 'uncheckAll' }
) => {
  emit('checkbox-change', keys, rows, meta)
}

// loading 处理
let tableLoading = null
let stop = null
/* 传入了 loading 就是用户进行控制 默认自动刷新loading就没有用 */
if (props.loading) {
  tableLoading = computed({
    get: () => props.loading,
    set: val => {
      tableLoading.value = val
    }
  })
} else if (!props.loading && props.initLoading) {
  /* loading 没有传入  initloading 为真 就是启用 自动刷新loading  */

  // 初始化设置 ref(true)
  tableLoading = ref(true)
  // 设置 watch 监听 props.data的变化
  stop = watch(
    () => props.data,
    () => {
      // 这里的主要目的处理初始化时的 loading
      // 初始化时 props.data 是 [] 为空 ,请求完成后就是 [...] 有值了
      // 就需要关闭 loading
      // 第一次搞完就停止掉这个watch
      if (tableLoading.value) {
        nextTick(() => {
          setTimeout(() => {
            tableLoading.value = false
            stop()
          }, 1000)
        })
      }
    },
    {
      immediate: true
    }
  )
}

const refreshTable = () => {
  emit('flushed')
  if (props.initLoading && !tableLoading.value) {
    tableLoading.value = true
    nextTick(() => {
      setTimeout(() => {
        tableLoading.value = false
      }, 1000)
    })
  }
}
</script>

<template>
  <div class="zai-table-view" :style="cssVars">
    <header class="zt-header flex-juspb-alc">

      <n-button strong secondary type="success" @click="emit('add')">
        <template #icon>
          <n-icon>
            <add />
          </n-icon>
        </template>
      </n-button>

      <div class="zt-header_right flex-alc">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon size="18" class="view-curspointer" @click="refreshTable">
              <Refresh />
            </n-icon>
          </template>
          刷新
        </n-tooltip>

        <n-divider vertical style="margin: 0 16px" />

        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="flex-alc zt-header-icon_right view-curspointer" :class="name" @click="toggle">
              <n-icon size="18">
                <ReorderTwoOutline />
              </n-icon>
            </div>
          </template>
          <span>斑马纹</span>
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="flex-alc zt-header-icon_right view-curspointer">
              <n-dropdown trigger="click" :options="densityOptions" @select="densitySelect" :value="tableSize">
                <n-icon size="18">
                  <ColumnHeightOutlined />
                </n-icon>
              </n-dropdown>
            </div>
          </template>
          <span>密度</span>
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="flex-alc zt-header-icon_right view-curspointer">
              <n-icon size="18" @click="lieFn">
                <SettingOutlined />
              </n-icon>
            </div>
          </template>
          <span>列设置</span>
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="flex-alc zt-header-icon_right view-curspointer">
              <n-icon size="18" @click="toggleFu">
                <FullscreenExitOutlined v-if="bool" />
                <FullscreenOutlined v-else />
              </n-icon>
            </div>
          </template>
          <span>全屏</span>
        </n-tooltip>
      </div>
    </header>
    <n-data-table
      class="zai-table"
      ref="dataTableRef"
      flex-height
      :columns="tableColumns"
      :data="props.data"
      :striped="striped"
      :size="tableSize"
      :scroll-x="scroll_x"
      :pagination="paginationReactive"
      :row-key="getRowKey"
      :loading="tableLoading"
      @update:checked-row-keys="checkboxChange"
    />
  </div>
</template>

<style scoped lang="scss">
.zai-table-view {
  background: var(--n-color);
  padding: 15px;

  .zt-header {
    height: 100%;
    padding: 5px 0 15px 0;

    .zt-header-icon_right {
      margin-right: 15px;
    }

    .zt-header-icon_right:hover {
      color: var(--n-text-color-hover);
    }
  }
}

.zai-header_true {
  color: var(--n-text-color);
}

.zai-table {
  height: calc(100vh - 65px - 30px - 54px);
}
</style>
