<script setup lang="ts" name="monaco-editor-modal">
import { CloseOutlined, FullscreenExitOutlined, FullscreenOutlined, MinusOutlined } from "@vicons/antd"
import { SaveMultiple20Regular, DocumentSave20Regular } from '@vicons/fluent'
import { useCommonStore } from '@/store'
import { useToggle, useDebounceFn } from '@vueuse/core'
import ModalForm from '@/components/modal-form.vue'

import type { Monaco } from '@monaco-editor/loader'
import loader from '@monaco-editor/loader'

import { getHighlighter } from 'shiki'
import { shikiToMonaco } from '@shikijs/monaco'

const props = withDefaults(defineProps<{
	show: boolean
	value: string | string[]
	language?: string
	fileName?: string
	validator?: (fileName: string) => Error
}>(), {
	value: '',
	language: 'vue'
})
const emit = defineEmits(['update:show', 'onChange', 'onSaveAsFile'])
const commStore = useCommonStore()

/** 弹窗背景颜色 */
const viewBack = computed(() => {
	return commStore.inverted ? '--modal-editror:#1e1e1e' : '--modal-editror:#fff'
})
/** 弹窗el */
const editorViewRef = ref()

const [spinShow, spinShowToggle] = useToggle(true)
const modalShow = computed({
	get: () => {
		if (props.show) {
			nextTick(() => {
				createMonacoEditor().then((res) => {
					document.addEventListener('keydown', saveKeyCtrl, false)
					if (res) {
						spinShowToggle()
					}
				})
			})
		}
		return props.show
	},
	set: (value) => {
		emit('update:show', value)
	}
})

let monacoEditor: Monaco | null = null
// @ts-ignore
// let editorModel: Monaco["editor"].ITextModel | null = null
let editorModel
let highlighter = null

async function createMonacoEditor() {
	if (editorViewRef.value && !monacoEditor) {
		// 创建一个可复用的语法高亮器
		highlighter = await getHighlighter({
			themes: [
				'one-dark-pro',
			],
			langs: [
				'javascript',
				'typescript',
				'vue'
			],
		})
		monacoEditor = await loader.init()

		// editorModel = monacoEditor.editor.createModel(Array.isArray(props.value) ? props.value.join('') : props.value, props.language);
		// 首先注册你需要的语言的 IDs
		monacoEditor.languages.register({ id: 'vue' })
		monacoEditor.languages.register({ id: 'typescript' })
		monacoEditor.languages.register({ id: 'javascript' })
		// 注册 Shiki 主题，并为 Monaco 提供语法高亮
		shikiToMonaco(highlighter, monacoEditor)
		monacoEditor.editor.create(editorViewRef.value, {
			// model: editorModel,
			value: Array.isArray(props.value) ? props.value.join('') : props.value,
			language: props.language,
			theme: 'one-dark-pro', //官方自带三种主题vs, hc-black, or vs-dark
			folding: true, // 是否启用代码折叠
			links: true, // 是否点击链接
			contextmenu: false, // 启用上下文菜单
			scrollBeyondLastLine: false, // 设置编辑器是否可以滚动到最后一行之后,在真实内容显示出来完，在加一段空白显示
			fontSize: 16,
			autoIndent: 'full', // 控制编辑器在用户输入、粘贴、移动或缩进行时是否应自动调整缩进。默认为高级选项。
			formatOnType: true, // 在键入时是否自动格式化代码
			formatOnPaste: true, //在粘贴时是否自动格式化代码。
			automaticLayout: true, // 自动布局
			minimap: {
				enabled: true, // 是否启用预览图
			},
			// 滚动设置
			scrollbar: {
				verticalScrollbarSize: 5, // 竖向滚动条宽度
				horizontalScrollbarSize: 10, // 横向滚动条宽度
				arrowSize: 10, //箭头的大小（如果显示）。默认为11。注意：使用updateOptions()无法更新此选项。
				alwaysConsumeMouseWheel: false, // 始终消耗鼠标滚轮事件（始终在浏览器事件上调用preventDefault()和stopPropagation()）。默认为true。注意：使用updateOptions()无法更新此选项。
			},
		})
		return 1
	}
	return 0
}

/** 保存 */
const getEditorValue = useDebounceFn(() => {
	const text = monacoEditor.editor.getModels().at(0).getValue()
	emit('onChange', text)
}, 500)
let ctrlSum = 0

function saveKeyCtrl(e: KeyboardEvent) {
	if (e.ctrlKey && e.key === 's') {
		e.preventDefault()
		++ctrlSum
		if (ctrlSum === 3) {
			window.$message.warning('请不要过于频繁保存，请等待 500ms')
			ctrlSum = 0
		}
		getEditorValue()
	}
}

/**  另存为 */
const fileName = ref('')
const ruleValidator = () => {
	if (!fileName.value) {
		throw Error('请填写文件名')
	}
}
const rule = {
	required: true,
	trigger: 'blur',
	validator: () => {
		if (props.validator) {
			props.validator(fileName.value)
		} else {
			ruleValidator()
		}
	}
}
const formRef = ref(null)

function saveAsFile() {
	formRef.value.validate((err: any) => {
		if (!err) {
			const text = monacoEditor.editor.getModels().at(0).getValue()
			emit('onSaveAsFile', { value: text, fileName: fileName.value })
		}
	})
}

const [modalFormShow, modalFormShowToggle] = useToggle()

/** 放大 */
const isFullscreen = ref(90)

function fullscreen() {
	if (isFullscreen.value === 90) {
		isFullscreen.value = 100
	} else {
		isFullscreen.value = 90
	}
}

onBeforeUnmount(() => {
	document.removeEventListener('keydown', saveKeyCtrl, true)
	if (monacoEditor) {
		monacoEditor.editor.getModels().at(0).dispose()
	}
})
</script>
<template>
	<modal-form v-model:show="modalFormShow" title="另存为" @confirm-form="saveAsFile">
		<n-form @keyup.enter="saveAsFile" ref="formRef">
			<n-form-item>
				<n-input-group>
					<n-input-group-label>原文件：</n-input-group-label>
					<n-input placeholder="原文件:" v-model:value="props.fileName" />
				</n-input-group>
			</n-form-item>
			<n-input-group :rule="rule">
				<n-input-group-label>新文件：</n-input-group-label>
				<n-input v-model:value="fileName" placeholder="文件名:" />
			</n-input-group>
		</n-form>
	</modal-form>
	<n-modal
			v-model:show="modalShow" :show-icon="false" display-directive="show" class="modal-editor-vscode"
			:style="[viewBack, { '--w': isFullscreen + 'vw', '--h': isFullscreen + 'vh' }]"
	>
		<div class="editor-vscode">
			<header class="editor-vscode-header w-100">

				<n-button-group>
					<n-button quaternary type="success" @click="() => getEditorValue()">
						<template #icon>
							<n-icon>
								<SaveMultiple20Regular />
							</n-icon>
						</template>
					</n-button>
					<n-button quaternary type="success" @click="() => modalFormShowToggle()">
						<template #icon>
							<n-icon>
								<DocumentSave20Regular />
							</n-icon>
						</template>
					</n-button>
				</n-button-group>

				<n-button-group>
					<n-button
							quaternary type="success" :native-focus-behavior="false" @focus="() => false"
							@click="() => emit('update:show', false)"
					>
						<template #icon>
							<n-icon>
								<MinusOutlined />
							</n-icon>
						</template>
					</n-button>
					<n-button quaternary type="success" @click="() => fullscreen()">
						<template #icon>
							<n-icon>
								<FullscreenExitOutlined v-if="isFullscreen === 100" />
								<FullscreenOutlined v-else />
							</n-icon>
						</template>
					</n-button>
					<n-button quaternary type="success" @click="() => emit('update:show', false)">
						<template #icon>
							<n-icon>
								<CloseOutlined />
							</n-icon>
						</template>
					</n-button>
				</n-button-group>
			</header>
			<n-spin :show="spinShow">
				<main class="editor-vscode-content">
					<div id="editor-vscode-view" class="w-100 h-100" ref="editorViewRef"></div>
				</main>
			</n-spin>
		</div>
	</n-modal>
</template>
<style lang="scss" scoped>
.editor-vscode {
  width: var(--w);
  height: var(--h);
  background-color: var(--modal-editror);
  border-radius: 3px 3px 7px 7px;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-content {
    height: calc(var(--h) - 34px - 3px);
  }
}
</style>