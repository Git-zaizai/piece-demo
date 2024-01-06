<script setup lang="ts" name="monaco-editor-modal">
import { CloseOutlined, FullscreenExitOutlined, FullscreenOutlined, MinusOutlined } from "@vicons/antd"
import { SaveMultiple20Regular, DocumentSave20Regular } from '@vicons/fluent'
import { useCommonStore } from '@/store'
import { useToggle, useDebounceFn } from '@vueuse/core'
import type { Monaco } from '@monaco-editor/loader'
import loader from '@monaco-editor/loader'
import ModalForm from '@/components/modal-form.vue'

const props = withDefaults(defineProps<{
	show: boolean
	value: string | string[]
	language?: string
}>(), {
	value: '',
	language: 'json'
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

async function createMonacoEditor() {
	if (editorViewRef.value && !monacoEditor) {
		monacoEditor = await loader.init()
		monacoEditor.editor.create(editorViewRef.value, {
			acceptSuggestionOnCommitCharacter: true, // 接受关于提交字符的建议
			acceptSuggestionOnEnter: 'off', // 接受输入建议 "on" | "off" | "smart"
			accessibilityPageSize: 10, // 辅助功能页面大小 Number 说明：控制编辑器中可由屏幕阅读器读出的行数。警告：这对大于默认值的数字具有性能含义。
			accessibilitySupport: 'on', // 辅助功能支持 控制编辑器是否应在为屏幕阅读器优化的模式下运行。
			autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
			autoClosingDelete: 'always', // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
			autoClosingOvertype: 'always', // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
			autoClosingQuotes: 'always', // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
			automaticLayout: true, // 自动布局
			codeLens: false, // 是否显示codeLens 通过 CodeLens，你可以在专注于工作的同时了解代码所发生的情况 – 而无需离开编辑器。 可以查找代码引用、代码更改、关联的 Bug、工作项、代码评审和单元测试。
			codeLensFontFamily: '', // codeLens的字体样式
			codeLensFontSize: 1, // codeLens的字体大小
			colorDecorators: false, // 呈现内联色彩装饰器和颜色选择器
			comments: {
				ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
				insertSpace: true, // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
			}, // 注释配置
			contextmenu: false, // 启用上下文菜单
			columnSelection: false, // 启用列编辑 按下shift键位然后按↑↓键位可以实现列选择 然后实现列编辑
			autoSurround: 'never', // 是否应自动环绕选择
			copyWithSyntaxHighlighting: true, // 是否应将语法突出显示复制到剪贴板中 即 当你复制到word中是否保持文字高亮颜色
			cursorBlinking: 'smooth', // 光标动画样式
			cursorSmoothCaretAnimation: 'on', // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
			cursorStyle: 'line-thin', // "Block"|"BlockOutline"|"Line"|"LineThin"|"Underline"|"UnderlineThin" 光标样式
			cursorSurroundingLines: 0, // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
			cursorSurroundingLinesStyle: 'all', // "default" | "all" 光标环绕样式
			cursorWidth: 2, // <=25 光标宽度
			minimap: {
				enabled: true, // 是否启用预览图
				showSlider: 'mouseover', // 在鼠标悬停时显示滑块
			},
			// 滚动设置
			scrollbar: {
				verticalScrollbarSize: 5,
				horizontalScrollbarSize: 5,
				arrowSize: 10,
				alwaysConsumeMouseWheel: false,
			},
			folding: true, // 是否启用代码折叠
			links: true, // 是否点击链接
			overviewRulerBorder: true, // 是否应围绕概览标尺绘制边框
			renderLineHighlight: 'gutter', // 当前行突出显示方式
			scrollBeyondLastLine: false, // 设置编辑器是否可以滚动到最后一行之后
			readOnly: true, // 是否为只读模式
			lineNumbers: 'on',
			lineNumbersMinChars: 4,
			theme: 'vs-dark', //官方自带三种主题vs, hc-black, or vs-dark
			language: props.language,
			fontSize: 13,
			roundedSelection: true, // 右侧不显示编辑器预览框
			autoIndent: 'full',
			formatOnType: true, // 在键入时是否自动格式化代码
			formatOnPaste: true, //在粘贴时是否自动格式化代码。
			wordWrap: 'on',
			wordWrapColumn: 80,
			value: Array.isArray(props.value) ? props.value.join('') : props.value
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
	e.preventDefault()

	if (e.ctrlKey && e.key === 's') {
		// window.event.returnValue = false
		++ctrlSum
		if (ctrlSum === 3) {
			window.$message.warning('请不要过于频繁保存，请等待 500ms')
			ctrlSum = 0
		}
		getEditorValue()
	}
}


onUnmounted(() => {
	document.removeEventListener('keydown', saveKeyCtrl, true)
})

/**  另存为 */
const fileName = ref('')
function saveAsFile() {
	if (!fileName.value) return
	emit('onSaveAsFile', fileName.value)
}
const [modalFormShow, modalFormShowToggle] = useToggle()


/** 全屏 */
const isFullscreen = ref(90)

function fullscreen() {
	if (isFullscreen.value === 90) {
		isFullscreen.value = 100
	} else {
		isFullscreen.value = 90
	}
	/** 方法找不到，看不到在哪  不黑找了 */
	// @ts-ignore
	// monacoEditor.editor.layout()
}


</script>
<template>
	<modal-form v-model:show="modalFormShow" title="另存为">
		<n-form @keyup.enter="saveAsFile">
			<n-form-item>
				<n-input-group>
					<n-input-group-label>原文件：</n-input-group-label>
					<n-input placeholder="原文件:" />
				</n-input-group>
			</n-form-item>
			<n-input-group>
				<n-input-group-label>新文件：</n-input-group-label>
				<n-input v-model:value="fileName" placeholder="文件名:" />
			</n-input-group>
		</n-form>
	</modal-form>
	<n-modal v-model:show="modalShow" :show-icon="false" display-directive="show" class="modal-editor-vscode"
		:style="[viewBack, { '--w': isFullscreen + 'vw', '--h': isFullscreen + 'vh' }]">
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
					<n-button quaternary type="success" :native-focus-behavior="false" @focus="() => false"
						@click="() => emit('update:show', false)">
						<template #icon>
							<n-icon>
								<MinusOutlined />
							</n-icon>
						</template>
					</n-button>
					<n-button quaternary type="success" @click="() => fullscreen()">
						<template #icon>
							<n-icon>
								<FullscreenExitOutlined v-if="isFullscreen === 90" />
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
		height: calc(90vh - 34px - 20px);
		padding: 10px;
	}
}
</style>