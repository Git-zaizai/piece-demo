<script setup lang="ts">
import { ZaiTable } from "@/components/table"
import { http } from "@/api"
import { NButton, NTag } from 'naive-ui'
import { Component } from 'vue'
import { Eye20Regular, EyeOff20Filled } from '@vicons/fluent'

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
      return row.chapter ? `${ row.chapter }章` : "无"
    }
  },
  {
    title: "读完",
    key: "duwan",
    render(row) {
      if (row.duwan == 0) {
        return h(
            NTag,
            {
              bordered: false,
              type: "success"
            },
            {
              default: () => "读完"
            }
        )
      }
      return h(
          NTag as Component,
          {
            bordered: false,
            type: "warning"
          },
          {
            default: () => "未读完"
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
              console.log(row.url)
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
              console.log(row.chapterUrl)
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

const state = reactive({
  data: [],
  form: {
    title: "",
    chapter: "",
    duwan: 0,
    recommended: 0,
    url: "",
    chapterUrl: "",
    beizhu: ""
  },
  show: false
})
const init = async () => {
  try {
    const { data } = await http.get("/api/novel")
    state.data = data.data.reverse()
  } catch (e) {
    console.error("init", e)
  }
}
init()
</script>

<template>
  <div>
    <zai-table :data="state.data" :columns="columns" checkbox-key="id"/>
  </div>
</template>

<style scoped lang="scss">

</style>