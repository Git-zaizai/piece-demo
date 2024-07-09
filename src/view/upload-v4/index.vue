<template>
  <div class="upload-index">
    <div class="upload-input-file">
      <input-file @file-change="fileChange"></input-file>
    </div>

    <n-button
      class="ui-but"
      type="primary"
      strong
      :disabled="upDisabled"
      :loading="upDisabled"
      @click="uploadClick"
      @contextmenu="onContextmenu"
    >
      <template #icon>
        <n-icon>
          <AirplaneTakeOff16Regular />
        </n-icon>
      </template>
      起飞
    </n-button>
    <div class="mt-20">
      <n-popover :show="showPopover" :x="popoverXY.x" :y="popoverXY.y" trigger="manual">
        {{ popoverXY.name }}
      </n-popover>
      <n-space :size="[16, 16]">
        <transition name="fade-scale" mode="out-in" appear v-for="(item, index) in state.files" :key="index">
          <FileItem
            :isImageOpen="cities"
            :index="index"
            v-bind="item"
            @on-popover="onPopover"
            @removeFile="removeFile"
            @displayReFile="displayReFile"
          />
        </transition>
      </n-space>
    </div>

    <n-popover
      :show="dropdown.show"
      :x="dropdown.x"
      :y="dropdown.y"
      trigger="manual"
      placement="bottom"
      id="contextmenuPopover"
    >
      <n-checkbox-group v-model:value="cities">
        <n-space vertical>
          <n-checkbox :value="0" label="目录上传" />
          <n-checkbox :value="1" label="上传目录保持一致" />
          <n-checkbox :value="2" label="不查看列表图片" />
          <n-checkbox :value="3" label="保存设置在本地" />
        </n-space>
      </n-checkbox-group>
      <n-button strong secondary type="error" size="tiny" class="w-100 mt-5" @click="deleteUploadFile">
        删除所有分片
      </n-button>
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import { DropResult, InputFile } from '@/components/inputFile'
import FileItem from './FileItem.vue'
import { AirplaneTakeOff16Regular } from '@vicons/fluent'
import { useToggle, useLocalStorage } from '@vueuse/core'
import { processingPath } from './utils'
import { http } from '@/api'
import apiConfig from '@/api/config'
import { upload } from './mergeUpload'
import { addScript } from '@/utils'
import Storage from '@/utils/Storage'

onMounted(() => {
  addScript('https://cdn.bootcdn.net/ajax/libs/spark-md5/3.0.2/spark-md5.js')
})

/**  */
const [showPopover, showPopoverToggle] = useToggle(false)
const popoverXY = ref({
  x: 0,
  y: 0,
  name: ''
})

function onPopover(x: number, y: number, name: string) {
  if (x === -1 && y === -1) {
    showPopoverToggle(false)
  } else {
    popoverXY.value = { x, y, name }
    showPopoverToggle(true)
  }
}

const cities = useLocalStorage('uploadConfig', [2])

let fileDrop = null
let rootPath: string = ''
const state = reactive({
  files: []
})

function fileChange(files: DropResult) {
  if (cities.value.includes(1)) {
    fileDrop = files.DirectoryTree
  }
  for (const file of files.filesArray) {
    state.files.push({
      displayReUpload: false,
      uploadCompleted: true,
      percentage: 0,
      file: file.file,
      link: '',
      progressStuts: 'success',
      path: file.path
    })
  }
}

const [upDisabled, upDisabledToggle] = useToggle()

async function uploadClick() {
  upDisabledToggle()

  let citiesPath = cities.value.includes(1)
  const files = state.files.filter(item => item.percentage === 0 && !item.link)

  if (citiesPath) {
    let pathList = processingPath(files, fileDrop.name)
    const respPath = await http.post('/createDirectory', {
      rootName: fileDrop.name,
      pathList
    })
    rootPath = respPath.data.data
  }

  for (const iterator of files) {
    try {
      let response = await upload({
        file: iterator.file,
        path: citiesPath ? rootPath : '0',
        callback: percentage => {
          iterator.percentage = percentage
        }
      })
      // 判断文件小于 < 1mb 延时隐藏进度条 给人看起来像上传过了
      if (iterator.file.size < 1024 * 1024 * 6) {
        setTimeout(() => {
          iterator.link = apiConfig.baseURL + response.url
        }, 1000)
      } else {
        iterator.link = apiConfig.baseURL + response.url
      }
    } catch (error) {
      console.log('文件上传失败', error)

      iterator.percentage = 99
      iterator.progressStuts = 'error'
      iterator.displayReUpload = true
    }
  }
  upDisabledToggle()
}

/**
 * 重新上传文件的处理函数
 *
 * @param index 文件索引
 * @returns 无返回值，该函数为异步函数
 */
async function displayReFile(index: number) {
  const fileItem = state.files[index]
  fileItem.percentage = 0
  fileItem.progressStuts = 'success'
  try {
    let response = await upload({
      file: fileItem.file,
      path: cities.value.includes(1) ? rootPath : '0',
      callback: percentage => {
        fileItem.percentage = percentage
      }
    })
    // 判断文件小于 < 1mb 延时隐藏进度条 给人看起来像上传过了
    if (fileItem.file.size < 1024 * 1024 * 6) {
      setTimeout(() => {
        fileItem.link = apiConfig.baseURL + response.url
      }, 1000)
    } else {
      fileItem.link = apiConfig.baseURL + response.url
    }
  } catch (error) {
    fileItem.percentage = 99
    fileItem.progressStuts = 'error'
    fileItem.displayReUpload = true
  }
}

const dropdown = reactive({
  show: false,
  x: 0,
  y: 0
})

function docClickOutside(e: any) {
  if (!document.querySelector('#contextmenuPopover').contains(e.target)) {
    dropdown.show = false
    document.removeEventListener('click', docClickOutside)
  }
}

function onContextmenu(e: PointerEvent) {
  e.preventDefault()
  if (!dropdown.show) {
    dropdown.show = true
    document.addEventListener('click', docClickOutside)
  }
  dropdown.x = e.x
  dropdown.y = e.y
}

function removeFile(index: number) {
  state.files.splice(index, 1)
  showPopoverToggle(false)
}

async function deleteUploadFile() {
  const info = Storage.get('info')
  if (!info) return
  http
    .get('/delete-all-shards')
    .then(() => {
      window.$message.success('删除完成')
    })
    .catch(() => {
      window.$notification.error({
        content: '删除失败',
        meta: '错误',
        duration: 5000,
        keepAliveOnHover: true
      })
    })
}
</script>

<style lang="scss" scoped>
.upload-index {
  padding: 20px 10px 10px 10px;

  .upload-input-file {
    height: 30vh;
  }

  .ui-but {
    width: 100%;
    padding: 25px;
    margin-top: 2vh;
  }
}

.file-from-view {
  padding: 5px 10px;
  margin-top: 10px;
  border-radius: var(--border-radius);
  border: 1px dashed rgb(224, 224, 230);
}
</style>
