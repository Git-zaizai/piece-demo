<template>
  <zai-table :columns="columns"
             :data="state.data"
             @flushed="init"
             checkbox-key="name"
             :actions-columns="actionsColumns"/>
</template>

<script setup lang="ts" name="jsondb">
import { ZaiTable } from '@/components/table'
import dayjs from 'dayjs'
import { http } from '@/api'
import { DataTableBaseColumn } from 'naive-ui'
import IndexActionsColumns from '../components/index-actionsColumns'

const columns: ZaiColumns = [
  {
    title: '文件名',
    key: 'name'
  },
  {
    title: '文件大小(字节)',
    key: 'size'
  },
  {
    title: '最新修改时间',
    key: 'up',
    render: row => {
      return dayjs(row.up as string).format('YYYY-MM-DD HH:mm:ss')
    }
  }
]

const state = reactive({
  data: []
})

const actionsColumns: DataTableBaseColumn = {
  title: "操作",
  key: "actions_0",
  fixed: "right",
  width: 200,
  render(row, rowIndex) {
    return h(IndexActionsColumns, {
      upFn: () => bindDbExport.bind(null, row),
      delFn: () => bindDbImport.bind(null, row)
    })
  }
}

async function bindDbExport(row) {
  try {
    const res = await http.get('/api/jsonstream', {
      params: {
        name: row.name
      }
    })
    let fileName = res.headers['content-disposition'].split(';')[1].split('filename=')[1]
    const blob = new Blob([res.data.data])
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = window.URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL对象
    document.body.removeChild(elink)
  } catch (e) {
    window.$message.error('导出下载失败')
    console.log(e)
  }
}

function bindDbImport() {
  window.$message.warning('后面再说')
}

const init = async () => {
  const { data } = await http.get('/api/jsonlist')
  state.data = data.data
}
init()
</script>

<style scoped lang="scss"></style>
