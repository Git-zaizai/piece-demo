<script setup lang="ts" name="db">
import { ZaiTable } from '@/components/table'
import { getMongoDb, createTable, delTable } from '@/api'
import type { DataTableBaseColumn } from 'naive-ui'
import { NButton } from 'naive-ui'
import ModalForm from '@/components/modal-form.vue'
import useBoolean from '@/hooks/use-boolean'
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
    render: () => {
      return '无'
    }
  }
]

const actionsColumns: DataTableBaseColumn = {
  title: "操作",
  key: "actions_0",
  fixed: "right",
  width: 100,
  render(row) {
    return h(
        NButton,
        {
          type: 'error',
          ghost: true,
          onClick: delButClick.bind(null, row)
        },
        {
          default: () => '删除'
        }
    )
  }
}

const netPrompt = (type: string, cont: string) => {
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
  return net
}


interface State {
  data: Array<{
    dbname: string
    db: string
    beizhu: string
  }>
}

const state: State = reactive({
  data: [],
})


const init = async () => {
  try {
    const response = await getMongoDb()
    const result = []
    const arr = response.data.data
    arr.forEach((mgv: string) => {
      result.push({
        dbname: mgv.split(".").pop(),
        db: 'MongoDB',
        beizhu: ''
      })
    })
    state.data = result
  } catch (e) {
    console.log(e)
  }
}
init()


const { bool: addFormShow, toggle } = useBoolean()

interface Mongo {
  status: "error" | "success" | "warning"
  value: string
  feedback: string
}

const mongo: Mongo = reactive({
  value: '',
  status: 'success',
  feedback: ''
})
const createTableConfirm = async () => {

  if (!mongo.value) {
    mongo.status = 'error'
    mongo.feedback = '不能为空'
    return
  }
  const regex = /[`~!#$%^&*()_\-+=<>?:\"{}|,.\/;'\\[\]]/
  if (regex.test(mongo.value)) {
    mongo.status = 'error'
    mongo.feedback = '只能输入英文、数字'
    return
  }
  mongo.feedback = ''
  const response = await createTable({ name: mongo.value }).catch(err => {
    netPrompt('error', err.data)
    return Promise.reject(err)
  })
  state.data.push({
    dbname: mongo.value,
    db: 'MongoDB',
    beizhu: ''
  })
  mongo.value = ''
  toggle()
  const net = netPrompt('success', response.data.msg)
  setInterval(() => {
    net.destroy()
  }, 2000)
}

const { bool: delShow, toggle: delToggle } = useBoolean()
const text = ref()

function delButClick(row: any) {
  text.value = row.dbname
  delToggle()
}

async function delTableConfirm() {
  const response = await delTable({ name: text.value }).catch(err => {
    netPrompt('error', err.toString())
    return Promise.reject(err)
  })
  text.value = ''
  delToggle()
  init()
  const net = netPrompt('success', response.data.msg)
  setInterval(() => {
    net.destroy()
  }, 2000)
}
</script>

<template>
  <div>
    <zai-table :data="state.data" :columns="columns" checkbox-key="dbname" :actions-columns="actionsColumns"
               @flushed="init" :checkbox="false" @add="toggle"/>
    <modal-form v-model:show="addFormShow" title="新建表" @confirm-form="createTableConfirm">
      <n-card>
        <n-tabs default-value="oasis" justify-content="space-between" type="line" animated>
          <n-tab-pane name="oasis" tab="mongoDB">
            <n-form-item label="表名：" :validation-status="mongo.status" :feedback="mongo.feedback">
              <n-input v-model:value="mongo.value" placeholder="请输入表名"/>
            </n-form-item>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </modal-form>
    <modal-form v-model:show="delShow" title="确定要删除吗？" @confirm-form="delTableConfirm">
      <br/>
      <h1>表：&ensp;{{ text }}</h1>
    </modal-form>
  </div>
</template>

<style scoped lang="scss"></style>