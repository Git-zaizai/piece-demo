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
				<FileItem v-for="(item, index) in state.files" :key="index" v-bind="item" @on-popover="onPopover" />
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
import { deleteFIleTreeItem, DropResult, fileTree, InputFile } from '@/components/inputFile'
import FileItem from './FileItem.vue'
import UploadConfig from './UploadConfig.vue'
import UploadList from './UploadList.vue'
import UploadHistoricRecord from './UploadHistoricRecord.vue'
import { AirplaneTakeOff16Regular } from '@vicons/fluent'
import { useFileIndexStore } from '@/store/modules/useFileIndexStore'
import type { FilesItem, fileTreeItem, localUploadConfigItem, LocalUploadListItem, uploadFileListItem } from './types'
import { initUploadConfig } from './init'
import { insertLocal, isImage, readyUpload } from './utils'
import { createDirectory } from '@/api'
import apiConfig from '@/api/config'
import { useToggle, useLocalStorage } from '@vueuse/core'

/**  */
const [showPopover, showPopoverToggle] = useToggle(false)
const popoverXY = ref({
	x: 0,
	y: 0,
	name: ''
})

function onPopover(x: number, y: number, name) {
	if (x === -1 && y === -1) {
		showPopoverToggle(false)
	} else {
		popoverXY.value = { x, y, name }
		showPopoverToggle(true)
	}
}

const cities = useLocalStorage('uploadConfig', [])
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
		state.files.push({
			iconType: true,
			imgShow: false,
			displayReUpload: false,
			uploadCompleted: true,
			percentage: 0,
			fileName: file.file.name
		})
	}
}

const [upDisabled, upDisabledToggle] = useToggle()

function uploadClick() {}


const dropdown = reactive({
	show: false,
	x: 0,
	y: 0,
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
