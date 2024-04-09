<script setup lang="ts">
import { ZaiTable } from '@/components/table'
import { http } from '@/api'

const { VITE_GLOB_IMG_URL, VITE_GLOB_API_URL_PREFIX } = import.meta.env
const columns: ZaiColumns = [
  {
    title: '原文件名',
    key: 'name',
    width: 150,
    fixed: 'left',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '新文件名',
    key: 'renamefile',
    width: 100,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '文件类型',
    key: 'type',
    width: 70
  },
  {
    title: '上传ip',
    key: 'xrealip',
    width: 110
  },
  {
    title: '文件大小',
    key: 'size',
    width: 110,
    render: row => row.size + ' Byte'
  },
  {
    title: '上传时间',
    key: 'lastModifiedDate',
    width: 150
  },
  {
    title: '保存地址',
    key: 'savepath',
    width: 100,
    render: row => row.savepath.replace('/www/wwwroot/gadgets/public', VITE_GLOB_IMG_URL + VITE_GLOB_API_URL_PREFIX),
    ellipsis: {
      tooltip: true
    }
  }
]

const state = ref([])

function init() {
  http.get('/curd-mongo/find/files', {}).then(res => {
    if (Array.isArray(res.data)) {
      state.value = (res.data as any).data
    } else {
      state.value = [res.data.data]
    }
  })
}
onMounted(() => {
  init()
})
</script>

<template>
  <div>
    <ZaiTable checkbox-key="_id" scroll-x :columns="columns" :data="state" @flushed="init"></ZaiTable>
  </div>
</template>
