<script setup lang="ts">
import { ZaiTable } from '@/components/table'
import { http } from '@/api'

defineOptions({
	name: 'files'
})

const { VITE_GLOB_IMG_URL, VITE_GLOB_API_URL_PREFIX } = import.meta.env
const columns = ref<ZaiColumns>([
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
		width: 110
	},
	{
		title: '上传IP',
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
])

const state = ref([])

function init() {
	http.get('/curd-mongo/find/files', { params: { ops: { many: true } } }).then(res => {
		if (Array.isArray(res.data.data)) {
			state.value = res.data.data.reverse()
		} else {
			state.value = [res.data.data].reverse()
		}
	})
}

function ceshi() {
	columns.value = [
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
			title: '保存地址',
			key: 'savepath',
			width: 100,
			render: row => row.savepath.replace('/www/wwwroot/gadgets/public', VITE_GLOB_IMG_URL + VITE_GLOB_API_URL_PREFIX),
			ellipsis: {
				tooltip: true
			}
		}, {
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
			width: 110
		},
		{
			title: '上传IP',
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
	]
}

onMounted(() => {
	init()
})
</script>

<template>
	<div>
		<ZaiTable checkbox-key="_id" scroll-x :columns="columns" :data="state" @flushed="init" @add="ceshi"></ZaiTable>
	</div>
</template>
