<template>
  <div>
    <zai-table :columns="columns"
               :data="state.data"
               @flushed="init"
               checkbox-key="name"
               :actions-columns="actionsColumns"/>
    <modal-form v-model:show="state.formShow" title="导入-覆盖" @confirm-form="confirm">
      <input-file title="JSON文件" @file-change="bindFileChange" :multiple="false" accept="application/json"/>
      <br/>
      <n-form-item label="文件：" label-placement="left">
        <n-input v-model:value="state.form.fileName" placeholder="" disabled/>
      </n-form-item>
      <n-form-item v-if="state.switchShow" label="是否强行覆盖文件：" label-placement="left">
        <n-switch v-model:value="state.form.swValue" size="large"></n-switch>
      </n-form-item>
    </modal-form>
  </div>
</template>

<script setup lang="ts">
import { ZaiTable } from '@/components/table'
import dayjs from 'dayjs'
import { http, upload } from '@/api'
import { DataTableBaseColumn, NButton, NotificationType } from 'naive-ui'
import IndexActionsColumns from '../components/index-actionsColumns'
import ModalForm from '@/components/modal-form.vue'
import { InputFile } from '@/components/inputFile'
import type { DropResult } from '@/components/inputFile'

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

let files = null
const state = reactive({
  data: [],
  formShow: false,
  switchShow: false,
  form: {
    fileName: '',
    swValue: false
  }
})

const actionsColumns: DataTableBaseColumn = {
  title: "操作",
  key: "actions_0",
  fixed: "right",
  width: 200,
  render(row, rowIndex) {
    return h(IndexActionsColumns, {
      upFn: bindDbExport.bind(null, row),
      delFn: () => state.formShow = !state.formShow
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

const netPrompt = (type: NotificationType, cont: string) => {
  let net = window.$notification.create({
    type: type,
    closable: false,
    title: `导入消息`,
    content: cont,
    meta: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    action: () =>
        h(NButton,
            {
              text: true,
              type: 'primary',
              onClick: () => {
                net.destroy()
              }
            },
            {
              default: () => '已读'
            }
        )
  })
}

function bindFileChange(data: DropResult) {
  files = data.filesArray[0].file
  state.form.fileName = files.name + '    ' + (files.size / 1027).toFixed(3) + 'KB'
}

async function confirm() {
  try {
    if (!files) {
      window.$message.error('请选择JSON数据文件')
      return
    }

    const formData = new FormData()
    formData.set('file', files)
    formData.set('path', '0')
    let response = await upload(formData)
    response = await http.post('/api/jsonimport', {
      path: response.data.url.replace('/uploads', ''),
      force: state.form.swValue
    })

    if (response.data.code === 400) {
      state.switchShow = !state.switchShow
      netPrompt('warning', response.data.msg)
    } else if (response.data.code === 399) {
      files = null
      netPrompt('warning', response.data.msg)
    } else {
      state.formShow = false
      state.switchShow = !state.switchShow
      state.form.swValue = false
      state.form.fileName = ''
      netPrompt('success', response.data.msg)
    }
  } catch (e) {
    console.log('提交文件失败', e)
    netPrompt('error', '文件上传失败！')
  }
}

const init = async () => {
  const { data } = await http.get('/api/jsonlist')
  state.data = data.data
}
init()
</script>

<style scoped lang="scss"></style>
