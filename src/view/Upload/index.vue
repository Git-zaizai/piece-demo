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
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import { DropResult, InputFile } from '@/components/inputFile'
import FileItem from './FileItem.vue'
import { AirplaneTakeOff16Regular } from '@vicons/fluent'
import { useToggle, useLocalStorage } from '@vueuse/core'
import { fileBlob } from './utils'
import { createDirectory, http } from '@/api'
import apiConfig from '@/api/config'

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
const state = reactive({
  files: [],
  upFiles: []
})

function fileChange(files: DropResult) {
  if (cities.value.includes(1)) {
    fileDrop = files.DirectoryTree
  }
  for (const file of files.filesArray) {
    const index = state.files.findIndex(fv => fv.file.name === file.file.name)
    if (index === -1) {
      state.files.push({
        displayReUpload: false,
        uploadCompleted: true,
        percentage: 0,
        file: file.file,
        link: '',
        progressStuts: 'success'
      })
    } else {
      window.$message.warning(`${file.file.name} 已有这个文件`)
    }
  }
}

const [upDisabled, upDisabledToggle] = useToggle()

const request = async (i: number) => {
  return new Promise((resolve, reject) => {
    const name = state.files[i].file.name
    console.log(state.files[i].file, state.files[i].file.size / 1024 / 1024)

    const blobList = fileBlob(state.files[i].file)
    console.log(blobList)

    let index = 0
    const upload = async () => {
      index++
      if (index >= blobList.length) {
        resolve(name)
        return
      }
      const formdata = new FormData()
      formdata.append('name', name)
      const path = cities.value.includes(0) ? state.files[i].path : 0
      formdata.append('path', path)
      formdata.append('file', blobList[index])
      try {
        await http.post('/upload-plus', formdata)
        state.files[i].percentage = (index / blobList.length) * 100
        upload()
      } catch (error) {
        reject(error)
      }
    }
    for (let r = 0; r < 6; r++) {
      upload()
    }
  })
}
async function uploadClick() {
  upDisabledToggle()

  for (let fi = 0; fi < state.files.length; fi++) {
    try {
      await request(fi)
      await http.post('/upload-merge', { name: state.files[fi].file.name })
    } catch (error) {
      state.files[fi].percentage = 99
      state.files[fi].progressStuts = 'error'
      state.files[fi].displayReUpload = true
    }
  }
  upDisabledToggle()
}

async function displayReFile(index: number) {
  state.files[index].percentage = 0
  state.files[index].progressStuts = 'success'
  try {
    await request(index)
    await http.post('/upload-merge', { name: state.files[index].file.name })
  } catch (error) {
    state.files[index].percentage = 99
    state.files[index].progressStuts = 'error'
    state.files[index].displayReUpload = true
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
