<script setup lang="ts">
import { ZaiTable } from "@/components/table"
import { http } from "@/api"
import { NTag, NButton } from "naive-ui"
import { Component } from "vue"
import { Eye20Regular, EyeOff20Filled } from "@vicons/fluent"
import ModalForm from "@/components/modal-form.vue"
import { copyStr } from '@/utils/index'

const columns: ZaiColumns = [
  {
    title: "id",
    key: "id",
    width: 50
  },
  {
    title: "小说名",
    key: "title"
  },
  {
    title: "章节数",
    key: "chapter",
    render: (row): string => {
      return row.chapter ? `${row.chapter}章` : "无"
    }
  },
  {
    title: "读完",
    key: "duwan",
    render(row) {
      let tagType = 'success',
        txt = '读完'
      if (row.duwan == '0') {
        tagType = 'warning'
        txt = '未读完'
      }
      return h(
        NTag as Component,
        {
          bordered: false,
          type: tagType
        },
        {
          default: () => txt
        }
      )
    }
  },
  {
    title: "推荐/小说",
    key: "recommended",
    render(row) {
      let reco = "小说"
      if (row.recommended == 1) {
        reco = "推荐"
      }
      return h(
        NTag as Component,
        {
          bordered: false,
          type: "info"
        },
        {
          default: () => reco
        }
      )
    }
  },
  {
    title: "删除状态",
    key: "isdel",
    render(row) {
      if (row.isdel === 0) {
        return h(
          NTag as Component,
          {
            bordered: false,
            type: "error"
          },
          {
            default: () => "删除",
            icon: () => h(EyeOff20Filled)
          }
        )
      }
      return h(
        NTag as Component,
        {
          bordered: false,
          type: "success"
        },
        {
          default: () => "存在",
          icon: () => h(Eye20Regular)
        }
      )
    }
  },
  {
    title: "首页链接",
    key: "url",
    render(row) {
      return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "small",
          onClick: () => {
            copyStr(row.url)
          }
        },
        {
          default: () => {
            if (!row.url || row.url === "") {
              return "无"
            }
            return "复制"
          }
        }
      )
    }
  },
  {
    title: "章节链接",
    key: "chapterUrl",
    render(row) {
      return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "small",
          onClick: () => {
            copyStr(row.url)
          }
        },
        {
          default: () => {
            if (!row.chapterUrl || row.chapterUrl === "") {
              return "无"
            }
            return "复制"
          }
        }
      )
    }
  },
  {
    title: "备注",
    key: "beizhu",
    ellipsis: {
      tooltip: true
    }
  }
]
const formEl = {
  duWan: [
    {
      value: 0,
      label: "未读完"
    },
    {
      value: 1,
      label: "读完"
    }
  ],
  rec: [
    {
      value: 0,
      label: "小说"
    },
    {
      value: 1,
      label: "推荐"
    }
  ]
}

const rules = {
  title: {
    trigger: "blur",
    required: true,
    validator(_, val: string) {
      if (val === "") {
        return new Error("不能为空")
      }
      if (isAction && state.data.some(v => v.title === val)) {
        return new Error("小说名不能相同")
      }
      return true
    }
  }
}

const state = reactive({
  data: [],
  form: {
    title: "",
    chapter: "",
    duwan: 0,
    recommended: 0,
    url: "",
    chapterUrl: "",
    beizhu: "",
    isdel: 1
  },
  show: false
})

const init = async () => {
  try {
    const { data } = await http.get("/curd-mongo/find/novel", { params: { ops: { many: true } } })
    state.data = data.data.reverse()
  } catch (e) {
    console.error("init", e)
  }
}
init()

// 判断是add\update
let isAction = true
const formRef = ref()

const tableAdd = () => {
  state.form = {
    title: "",
    chapter: "",
    duwan: 0,
    recommended: 0,
    url: "",
    chapterUrl: "",
    beizhu: "",
    isdel: 1
  }
  isAction = true
  state.show = true
}

const updateItem = row => {
  isAction = false
  state.form = row
  state.show = true
}

const formSubmit = () => {
  formRef.value.validate(async (err: any) => {
    try {
      if (!err) {
        let url = isAction ? "/novel/add" : "/novel/update"
        let body: any = state.form
        if (!isAction) {
          body.where = {
            title: state.form.title
          }
        }
        const res = await http.post(url, state.form)
        if (isAction) {
          // const res = await http.get("/desc-limit/novel")
          state.data.unshift(Object.assign(state.form, res.data.data))
          state.form = {
            title: "",
            chapter: "",
            duwan: 0,
            recommended: 0,
            url: "",
            chapterUrl: "",
            beizhu: "",
            isdel: 1
          }
        }
        window.$message.success("操作成功")
      }
    } catch (err) {
      console.log(err)
    }
  })
}

const delItem = async (row, index) => {
  // await http
  //   .post("/novel/update", {
  //     where: { title: row.title },
  //     isdel: !row.isdel
  //   })
  //   .catch(err => Promise.reject(err))
  await http.post('/novel/update', { isdel: state.form?.isdel ?? 0 })
  state.data[index].isdel = Number(!row.isdel)
}
</script>

<template>
  <div>
    <zai-table :columns="columns" :data="state.data" checkbox-key="_id" @add="tableAdd" @flushed="init"
      @del-item="delItem" @update-item="updateItem" />
    <modal-form v-model:show="state.show" @confirm-form="formSubmit">
      <n-form ref="formRef" label-placement="left" label-width="100" label-align="left" :model="state.form" :rules="rules"
        @keyup.enter="formSubmit">
        <n-form-item label="小说名:" path="title">
          <n-input placeholder="小说名" clearable v-model:value="state.form.title" />
        </n-form-item>
        <n-form-item label="章节数：">
          <n-input placeholder="章节数" clearable v-model:value="state.form.chapter" />
        </n-form-item>
        <n-form-item label="读完：">
          <n-radio-group v-model:value="state.form.duwan" name="radiogroup">
            <n-space>
              <n-radio v-for="song in formEl.duWan" :key="song.value" :value="song.value">
                {{ song.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="推荐/小说：">
          <n-radio-group v-model:value="state.form.recommended" name="radiogroup">
            <n-space>
              <n-radio v-for="song in formEl.rec" :key="song.value" :value="song.value">
                {{ song.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="首页链接：">
          <n-input placeholder="首页链接" clearable v-model:value="state.form.url" />
        </n-form-item>
        <n-form-item label="章节链接：">
          <n-input placeholder="章节链接" clearable v-model:value="state.form.chapterUrl" />
        </n-form-item>
        <n-form-item label="备注：">
          <n-input placeholder="备注" type="textarea" clearable v-model:value="state.form.beizhu" />
        </n-form-item>
      </n-form>
    </modal-form>
  </div>
</template>

<style scoped lang="scss"></style>
