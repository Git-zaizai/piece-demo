<script lang="tsx">
export interface Link {
  linkName: string
  url: string
}

export interface Row {
  _id: string
  title: string
  start: number
  finish: number
  duwan: number
  tabs: string[]
  wanjie: number
  isdel: number
  link: string
  linkback: string
  beizhu: string
  links: Link[]
  addDate: string
  update: string
  finishtime: string
  rate: any[]
  id: number
}
import { Edit32Regular } from '@vicons/fluent'
import { NIcon } from 'naive-ui'
const linkAction = (onClick: (row: any, index: number) => void) => {
  return (row: any, index: number) => (
    <n-button type='success' ghost size='small' onClick={() => onClick(row, index)}>
      {{
        icon: () => (
          <NIcon class='scale-X'>
            {{
              default: () => <Edit32Regular />
            }}
          </NIcon>
        ),
        default: () => '编辑'
      }}
    </n-button>
  )
}
</script>

<script setup lang="tsx">
import { ZaiTable } from '@/components/table'
import { http } from '@/api'
import { NTag, NSpace, DataTableColumn } from 'naive-ui'
import ModalForm from '@/components/modal-form.vue'
import { copyStr, rand } from '@/utils/index'
import dayjs from 'dayjs'
import { useToggle } from '@vueuse/core'
import { Add, Close } from '@vicons/ionicons5'

const actionsColumns: DataTableColumn = {
  title: '操作',
  key: 'link_actions',
  fixed: 'right',
  width: 110,
  render: linkAction(tableAdd)
}

function randTagType(): any {
  const list = ['default', 'success', 'error', 'warning', 'primary', 'info']
  return list[rand(0, list.length)]
}

const createColumns = (tabOptions): ZaiColumns => [
  {
    title: '小说名',
    key: 'title',
    width: 200,
    fixed: 'left'
  },
  {
    title: '读到那章',
    key: 'start-finish',
    render: row => `${row.start} - ${row.finish}`,
    width: 90
  },
  {
    title: '读完',
    key: 'duwan',
    render(row) {
      let tagType = 'success',
        txt = '读完'
      if (row.duwan == '0') {
        tagType = 'warning'
        txt = '未读完'
      }

      return (
        // @ts-ignore
        <NTag bordered={false} type={tagType}>
          {txt}
        </NTag>
      )
    },
    width: 90,
    sorter: 'default'
  },
  {
    title: '标签',
    key: 'tabs',
    render(row: any) {
      return (
        <NSpace>
          {row.tabs.map(item => (
            <NTag bordered={false} type={randTagType()}>
              {item}
            </NTag>
          ))}
        </NSpace>
      )
    },
    minWidth: 200,
    filterOptions: tabOptions,
    filter(
      value: string,
      {
        tabs
      }: {
        tabs: string[]
      }
    ) {
      return tabs.includes(value)
    }
  },
  {
    title: '完结/连载',
    key: 'wanjie',
    render(row) {
      let reco = '完结'
      if (row.wanjie == 1) {
        reco = '连载'
      }
      return (
        <NTag bordered={false} type='info'>
          {row.wanjie == 1 ? '完结' : '连载'}
        </NTag>
      )
    },
    width: 110,
    sorter: 'default'
  },
  {
    title: '删除状态',
    key: 'isdel',
    render(row, index) {
      return (
        <n-button
          type={row.isdel ? 'success' : 'warning'}
          strong
          secondary
          size={'small'}
          onClick={() => updateDel(row, index)}
        >
          {row.isdel ? '显示' : '隐藏'}
        </n-button>
      )
    },
    width: 110,
    sorter: 'default'
  },
  {
    title: '首页链接',
    key: 'link',
    render(row) {
      return (
        <n-button strong tertiary size={'small'} onClick={() => copyStr(row.link as string)}>
          {row.link ? '复制' : '无'}
        </n-button>
      )
    },
    width: 90
  },
  {
    title: '后续链接',
    key: 'linkback',
    render(row) {
      return (
        <n-button strong tertiary size={'small'} onClick={() => copyStr(row.linkback as string)}>
          {row.linkback ? '复制' : '无'}
        </n-button>
      )
    },
    width: 90
  },
  {
    title: '备注',
    key: 'beizhu',
    ellipsis: {
      tooltip: true
    },
    width: 90
  },
  {
    title: '其他链接',
    key: 'links',
    render(row: any) {
      if (!row.links.length) {
        return (
          <NTag bordered={false} type={'default'}>
            无
          </NTag>
        )
      }
      return row.links.map(item => (
        <n-button strong tertiary size={'small'} onClick={() => copyStr(item.urli)}>
          {item.linkName}
        </n-button>
      ))
    },
    width: 90
  },

  {
    title: '添加时间',
    key: 'addDate',
    render: row => dayjs(row.addDate as string).format('YYYY-MM-DD HH:mm:ss'),
    width: 160
  },
  {
    title: '修改时间',
    key: 'update',
    render: row => dayjs(row.update as string).format('YYYY-MM-DD HH:mm:ss'),
    width: 160
  },
  {
    title: '看完时间',
    key: 'finishtime',
    render: row => dayjs(row.finishtime as string).format('YYYY-MM-DD HH:mm:ss'),
    width: 160
  },
  {
    title: '评分',
    key: 'rate',
    render: (row: any) => {
      if (!row.rate.length) {
        return (
          <NTag bordered={false} type={'default'}>
            无
          </NTag>
        )
      }
      return row.rate.map(item => (
        <NTag bordered={false} type={'default'}>
          {item}
        </NTag>
      ))
    }
  }
]

const [showForm, showFormToggle] = useToggle()
let columns = []
const tabs = ref<string[]>([])
const formData = ref<Row>({
  _id: '',
  title: '',
  start: 1,
  finish: 111,
  duwan: 1,
  tabs: [],
  wanjie: 0,
  isdel: 1,
  link: '',
  linkback: '',
  beizhu: '',
  links: [
    {
      linkName: '',
      url: '1'
    },
    {
      linkName: '',
      url: '2'
    }
  ],
  addDate: null,
  update: null,
  finishtime: null,
  rate: [],
  id: 0
})
const state = ref<Row[]>([])

const rule = {
  trigger: 'blur',
  required: true,
  validator(_, val: string) {
    if (val === '') {
      return new Error('不能为空')
    }
    if (isAction === 'add' && state.value.some(v => v.title === val)) {
      return new Error('小说名不能相同')
    }
    return true
  }
}

const getTabsJson = async () => {
  const response = await http.get('/json-get', { params: { ph: 'tabs.json' } })
  tabs.value = response.data.data
  columns = createColumns(tabs.value.map(item => ({ value: item, label: item })))
}

const getData = async () => {
  const { data } = await http.get('/curd-mongo/find/novel', { params: { ops: { many: true } } })
  /*  state.value = data.data
    .map(v => {
      v.title = '**dsd4' + rand(0, 100)
      return v
    })
    .reverse() */
  state.value = data.data.reverse()
}
onMounted(() => {
  getTabsJson().then(getData)
})

// 判断是add\update
let isAction = 'add'
const formRef = ref()

function tableAdd() {
  isAction = 'add'
  showFormToggle()
}

function updateItem(row) {
  isAction = 'update'
  formData.value = JSON.parse(JSON.stringify(row))
  showFormToggle()
}

const formSubmit = () => {
  formRef.value.validate(async (err: any) => {
    try {
      if (!err) {
        const response = await http.post(`/mong/novel/${isAction}`, formData.value)
        if (isAction === 'add') {
          state.value.unshift(response.data.data)
        } else {
          const index = state.value.findIndex(v => v._id === formData.value._id)
          state.value[index] = formData.value
        }
        window.$message.success(response.data.msg)
      }
    } catch (err) {
      console.log(err)
      window.$message.error('意外错误，请查看控制台')
    }
  })
}

async function updateDel(row: Row, index: any) {
  const sum = Number(!row.isdel)
  await http
    .post('/mong/novel/update', {
      _id: row._id,
      isdel: sum
    })
    .catch(e => {
      window.$message.error('意外错误，请查看控制台')
      return Promise.reject(e)
    })
  state.value[index].isdel = sum
}

function addLinks() {
  formData.value.links.push({
    linkName: '',
    url: ''
  })
}

function bindRemoveLink(index) {
  formData.value.links.splice(index, 1)
}
</script>

<template>
  <div>
    <zai-table
      :columns="columns"
      :data="state"
      checkbox-key="_id"
      @add="tableAdd"
      @flushed="getData"
      @update-item="updateItem"
      scroll-x
      :actions-columns="actionsColumns"
    />
    <modal-form v-model:show="showForm" @confirm-form="formSubmit" style="width: 60vw">
      <n-form
        ref="formRef"
        label-placement="left"
        label-width="100"
        label-align="right"
        :model="formData"
        @keyup.enter="formSubmit"
      >
        <n-form-item label="小说名:" path="title" :rule="rule">
          <n-input placeholder="小说名" clearable v-model:value="formData.title" />
        </n-form-item>

        <n-form-item label="读到那章:">
          <n-input-group>
            <n-input-number v-model:value="formData.start" class="text-align flex-1" button-placement="both" />
            <n-input-group-label>--</n-input-group-label>
            <n-input-number v-model:value="formData.finish" class="text-align flex-1" button-placement="both" />
          </n-input-group>
        </n-form-item>

        <n-form-item label="读完：">
          <n-radio-group v-model:value="formData.duwan" name="radiogroup">
            <n-space>
              <n-radio-button :value="1" label="读完" />
              <n-radio-button :value="0" label="未读完" />
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-form-item label="标签：">
          <n-checkbox-group v-model:value="formData.tabs">
            <n-space item-style="display: flex;">
              <n-checkbox v-for="item in tabs" :value="item" :label="item" />
            </n-space>
          </n-checkbox-group>
        </n-form-item>

        <n-form-item label="完结/连载：">
          <n-radio-group v-model:value="formData.wanjie" name="radiogroup">
            <n-space>
              <n-radio-button :value="1" label="完结" />
              <n-radio-button :value="0" label="连载" />
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-form-item label="删除状态：">
          <n-radio-group v-model:value="formData.isdel" name="radiogroup">
            <n-space>
              <n-radio-button :value="1" label="显示" />
              <n-radio-button :value="0" label="隐藏" />
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-form-item label="首链接:">
          <n-input placeholder="" clearable v-model:value="formData.link" />
        </n-form-item>

        <n-form-item label="后续链接:">
          <n-input placeholder="" clearable v-model:value="formData.linkback" />
        </n-form-item>

        <n-form-item label="备注：">
          <n-input placeholder="备注" type="textarea" clearable v-model:value="formData.beizhu" />
        </n-form-item>

        <n-form-item label="评分:">
          <n-input placeholder="" clearable v-model:value="formData.rate" />
        </n-form-item>

        <div class="links mb-10" v-for="(linkItem, linki) in formData.links" :key="linki">
          <transition name="fade-scale" mode="out-in" appear>
            <div class="flex-alc">
              <div class="flex-1">
                <n-form-item :label="linkItem.linkName ? linkItem.linkName : '链接名：'">
                  <n-input placeholder="链接名" clearable v-model:value="linkItem.linkName" />
                </n-form-item>
                <n-form-item label="URL:">
                  <n-input placeholder="URL" clearable v-model:value="linkItem.url" />
                </n-form-item>
              </div>
              <n-button class="ml-20" strong secondary type="tertiary" @click="bindRemoveLink(linki)">
                <n-icon size="22"><Close /></n-icon>
              </n-button>
            </div>
          </transition>
        </div>

        <div class="w-100 flex-fdc-alc-juc">
          <n-button strong secondary type="tertiary" @click="addLinks">
            <n-icon size="26"><Add /></n-icon>
          </n-button>
        </div>
      </n-form>
    </modal-form>
  </div>
</template>

<style scoped lang="scss">
.links :deep(.n-form-item-feedback-wrapper) {
  min-height: 5px;
}
</style>
