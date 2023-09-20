<script setup lang="ts" name="db">
import { ZaiTable } from '@/components/table'
import { getMongoDb, getMySql, getDbLists, setDbFile, upload } from '@/api'
import IndexActionsColumns from '../components/index-actionsColumns'
import type { DataTableBaseColumn } from 'naive-ui'
import { NButton } from 'naive-ui'
import ModalForm from '@/components/modal-form.vue'
import { InputFile } from '@/components/inputFile'
import dayjs from 'dayjs'

const columns: ZaiColumns = [
  {
    title: '库名',
    key: 'dbname'
  },
  {
    title: '在那个数据库',
    key: 'db'
  },
  {
    title: '备注',
    key: 'beizhu',
    render: row => {
      return '无'
    }
  }
]

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
    const res = await getDbLists({
      db: row.db,
      tableName: row.dbname
    })
    if (res.data.data.langth === 0) {
      window.$message.error('表为空')
      return
    }
    const texts = ['[']
    const len = res.data.data.length
    res.data.data.forEach((item, index) => {
      texts.push(JSON.stringify(item))
      if (index < len - 1) {
        texts.push(',')
      }
    })
    texts.push(']')
    const blob = new Blob(texts, { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const el = document.createElement('a')
    el.href = url
    el.download = row.dbname + '.json'
    el.target = '_blank'
    el.click()
    window.$message.success('导出成功')
    setTimeout(() => {
      el.remove()
      URL.revokeObjectURL(url)
    }, 1500)
  } catch (e) {
    console.log(e)
  }
}


interface State {
  data: Array<{
    dbname: string
    db: string
    beizhu: string
  }>
  formShow: boolean
  files: []
  fileName: string
  row: any
  delKey: string
}

const state: State = reactive({
  data: [],
  formShow: false,
  files: [],
  fileName: '',
  row: {},
  delKey: 'id'
})

const init = async () => {
  try {
    const mysql = await getMySql()
    const mongo = await getMongoDb()
    const datas = []
    mongo.data.data.forEach(mgv => {
      datas.push({
        dbname: mgv.split(".").pop(),
        db: 'MongoDB',
        beizhu: ''
      })
    })
    mysql.data.data.forEach(myv => {
      datas.push({
        dbname: myv.Tables_in_gadgets,
        db: 'MySQL',
        beizhu: ''
      })
    })
    state.data = datas
  } catch (e) {
    console.log(e)
  }
}
init()

function bindDbImport(row) {
  state.row = row
  state.formShow = true
}

const bindFileChange = data => {
  state.fileName = data.filesArray[0].file.name
  state.files = data.filesArray
}

const netPrompt = (type, cont) => {
  let net = window.$notification.create({
    type: type,
    closable: false,
    title: `导入消息`,
    content: cont,
    meta: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    action: () =>
        h(
            NButton,
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

const confirm = async () => {
  try {
    if (!state.files.length) {
      window.$message.error('请选择JSON数据文件')
      return
    }
    const formData = new FormData()
    // @ts-ignore
    formData.set('file', state.files[0].file)
    formData.set('path', '0')
    const res_file = await upload(formData)
    const { data } = await setDbFile({
      path: (res_file.data.url as string).replace('/uploads', ''),
      db: state.row.db,
      tableName: state.row.dbname,
      delkey: state.delKey
    })
    if (data.code === 200) {
      netPrompt('success', `${ state.row.dbname } 导入成功`)
    } else {
      netPrompt('error', data.data.msg)
    }
  } catch (e) {
    console.log(e)
    netPrompt('error', `${ state.row.dbname } 导入失败`)
  }
}

</script>

<template>
  <div>
    <zai-table :data="state.data"
               :columns="columns"
               checkbox-key="dbname"
               :actions-columns="actionsColumns"
               @flushed="init"
               :checkbox="false"/>
    <modal-form v-model:show="state.formShow" title="导入" @confirm-form="confirm">
      <input-file title="JSON文件" @file-change="bindFileChange"/>
      <n-card class="mt-10" v-show="state.files.length"> 文件: {{ state.fileName }}</n-card>
      <n-form-item label="要删除key，比如自动递增的id" class="mt-10">
        <n-input v-model:value="state.delKey" clearable></n-input>
      </n-form-item>
      <h4>详细说明：</h4>
      <h4>mysql有个神奇的语法：insert into ... on duplicate key update，该语法在insert的时候，
          如果insert的数据会引起唯一索引（包括主键索引）的冲突，即这个唯一值重复了，则不会执行insert操作，
          而执行后面的update操作</h4>
      <h4>所有默认 key:id，你不输入将不会进行update操作会直接往后添加</h4>
    </modal-form>
  </div>
</template>

<style scoped lang="scss">

</style>