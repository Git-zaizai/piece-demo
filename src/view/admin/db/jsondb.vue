<template>
	<div>
		<zai-table :columns="columns" :data="state" @flushed="init" checkbox-key="name" :actions-columns="actionsColumns"
			@add="modalShowToggle" />
		<modal-form v-model:show="modalShow" title="导入-覆盖" @confirm-form="confirm">
			<input-file title="JSON文件" @file-change="bindFileChange" :multiple="false" accept="application/json" />
			<br />
			文件：
			<n-tag type="success" v-if="fileData.fileName">
				{{ fileData.fileName }}
			</n-tag>
			<br />
			<br />
			文件大小：
			<n-tag type="warning" v-if="fileData.size">
				{{ fileData.size ?? '' }}
			</n-tag>
			<br />
			<br />
			<div v-if="formShow" class="sw-view">
				<n-popover trigger="manual" :show="popoverShow" placement="right">
					<template #trigger>
						<div>
							是否强行覆盖文件：
							<n-switch v-model:value="swValue" size="large"></n-switch>
						</div>
					</template>
					<span>请确认强制覆盖文件</span>
				</n-popover>
			</div>
		</modal-form>
		<monaco-editor-modal v-model:show="editorShow" language="json" :value="editorValue" />
	</div>
</template>

<script setup lang="ts">
import { ZaiTable } from '@/components/table'
import dayjs from 'dayjs'
import { http } from '@/api'
import { NButton } from 'naive-ui'
import type { NotificationType, DataTableBaseColumn } from 'naive-ui'
import JsonActions from '../components/json-actionsColumns'
import ModalForm from '@/components/modal-form.vue'
import { InputFile } from '@/components/inputFile'
import type { DropResult } from '@/components/inputFile'
import { useToggle } from '@vueuse/core'
import monacoEditorModal from '@/components/monaco-editor-modal.vue'


interface Jsondb {
	name: string;
	size: number;
	mtime: string;
	path: string;
}

const columns: ZaiColumns = [
	{
		title: '文件名',
		key: 'name'
	},
	{
		title: '文件大小(字节)',
		key: 'size',
		render: row => (row.size + ' Byte')
	},
	{
		title: '最新修改时间',
		key: 'up',
		render: row => {
			return dayjs(row.up as string).format('YYYY-MM-DD HH:mm:ss')
		}
	}
]


const [modalShow, modalShowToggle] = useToggle()
const [editorShow, editorShowToggle] = useToggle()
const state = ref<Jsondb[]>([])


const actionsColumns: DataTableBaseColumn = {
	title: "操作",
	key: "actions_0",
	fixed: "right",
	width: 270,
	render(row) {
		return h(JsonActions, {
			onEditor: getJsonValue.bind(null, row),
			onExport: onExport.bind(null, row),
			onImport: modalShowToggle
		})
	}
}

const editorValue = ref('')

async function getJsonValue(item: Jsondb) {
	editorShowToggle()
	try {
		const response = await http.get('/json-get', {
			params: {
				ph: item.name
			}
		})
		editorValue.value = JSON.stringify(response.data.data)
	} catch (e) {
		window.$message.error(`获取 ${item.name} 数据失败！`)
	}
}

async function onExport(row: Jsondb) {
	try {
		const res = await http.get('/download-json', {
			params: {
				ph: row.name
			},
			responseType: 'blob'
		})
		const contentDisposition = res.headers['content-disposition']
		const blob = new Blob([res.data])
		const elink = document.createElement('a')
		elink.download = contentDisposition.substring(contentDisposition.indexOf('filename=') + 'filename='.length)
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

const [formShow, formShowToggle] = useToggle()
const [popoverShow, popoverShowToggle] = useToggle()
const swValue = ref(false)
const fileData = ref({
	fileName: '',
	size: ''
})
let files = null
function bindFileChange(filesDrop: DropResult) {
	files = filesDrop.filesArray[0].file
	fileData.value = {
		fileName: files.name,
		size: (files.size / 1027).toFixed(3) + ' KB'
	}
	if (state.value.some(item => item.name === files.name)) {
		formShowToggle(true)
	} else {
		formShowToggle(false)
	}
}

async function confirm() {
	try {
		if (!files) {
			window.$message.error('请选择JSON数据文件')
			return
		}

		if (formShow.value && !swValue.value) {
			popoverShowToggle(true)
			return
		}
		const formdata = new FormData()
		formdata.append('file', files.name)
		formdata.append('file', files)
		let response = await http.post('/upload', formdata)
		response = await http.post('/rename-json', {
			ph: response.data.data.url,
			name: files.name
		})

		files = null
		fileData.value = {
			fileName: '',
			size: ''
		}
		formShowToggle(false)
		swValue.value = false
		popoverShowToggle(false)

		init().then(() => netPrompt('success', '导入成功'))
	} catch (e) {
		console.log('提交文件失败', e)
		netPrompt('error', '导入失败！')
	}
}

const init = async () => {
	const { data } = await http.get('/json-list')
	state.value = data.data as Jsondb[]
}
init()
</script>

<style scoped>
.sw-view {
	display: inline-flex;
	align-items: center;
}
</style>
