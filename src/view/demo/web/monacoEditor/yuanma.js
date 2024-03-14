const yuanma =
	`<script setup lang="ts" name="monaco-editor-modal">
import { CloseOutlined, FullscreenExitOutlined, FullscreenOutlined, MinusOutlined } from "@vicons/antd"
import { SaveMultiple20Regular, DocumentSave20Regular } from '@vicons/fluent'
import { useCommonStore } from '@/store'
import { useToggle, useDebounceFn } from '@vueuse/core'
import type { Monaco } from '@monaco-editor/loader'
import loader from '@monaco-editor/loader'
import ModalForm from '@/components/modal-form.vue'

const props = withDefaults(defineProps<{
\tshow: boolean
\tvalue: string | string[]
\tlanguage?: string
}>(), {
\tvalue: '',
\tlanguage: 'json'
})
const emit = defineEmits(['update:show', 'onChange', 'onSaveAsFile'])
const commStore = useCommonStore()

/** 弹窗背景颜色 */
const viewBack = computed(() => {
\treturn commStore.inverted ? '--modal-editror:#1e1e1e' : '--modal-editror:#fff'
})
/** 弹窗el */
const editorViewRef = ref()

const [spinShow, spinShowToggle] = useToggle(true)
const modalShow = computed({
\tget: () => {
\t\tif (props.show) {
\t\t\tnextTick(() => {
\t\t\t\tcreateMonacoEditor().then((res) => {
\t\t\t\t\tdocument.addEventListener('keydown', saveKeyCtrl, false)
\t\t\t\t\tif (res) {
\t\t\t\t\t\tspinShowToggle()
\t\t\t\t\t}
\t\t\t\t})
\t\t\t})
\t\t}
\t\treturn props.show
\t},
\tset: (value) => {
\t\temit('update:show', value)
\t}
})

let monacoEditor: Monaco | null = null

async function createMonacoEditor() {
\tif (editorViewRef.value && !monacoEditor) {
\t\tmonacoEditor = await loader.init()
\t\tconst editorModel = monacoEditor.editor.createModel(Array.isArray(props.value) ? props.value.join('') : props.value, 'text');
\t\tmonacoEditor.editor.create(editorViewRef.value, {
\t\t\t/***
\t\t\t
\t\t\t配置项 自选用
\t\t\t 
\t\t\t **/
\t\t\tacceptSuggestionOnCommitCharacter: true, // 接受关于提交字符的建议
\t\t\tacceptSuggestionOnEnter: 'off', // 接受输入建议 "on" | "off" | "smart"
\t\t\taccessibilityPageSize: 10, // 辅助功能页面大小 Number 说明：控制编辑器中可由屏幕阅读器读出的行数。警告：这对大于默认值的数字具有性能含义。
\t\t\taccessibilitySupport: 'on', // 辅助功能支持 控制编辑器是否应在为屏幕阅读器优化的模式下运行。
\t\t\tautoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
\t\t\tautoClosingDelete: 'always', // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
\t\t\tautoClosingOvertype: 'always', // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
\t\t\tautoClosingQuotes: 'always', // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
\t\t\tautomaticLayout: true, // 自动布局
\t\t\tcodeLens: false, // 是否显示codeLens 通过 CodeLens，你可以在专注于工作的同时了解代码所发生的情况 – 而无需离开编辑器。 可以查找代码引用、代码更改、关联的 Bug、工作项、代码评审和单元测试。
\t\t\tcodeLensFontFamily: '', // codeLens的字体样式
\t\t\tcodeLensFontSize: 1, // codeLens的字体大小
\t\t\tcolorDecorators: false, // 呈现内联色彩装饰器和颜色选择器
\t\t\tcomments: {
\t\t\t\tignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
\t\t\t\tinsertSpace: true, // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
\t\t\t}, // 注释配置
\t\t\tcontextmenu: false, // 启用上下文菜单
\t\t\tcolumnSelection: false, // 启用列编辑 按下shift键位然后按↑↓键位可以实现列选择 然后实现列编辑
\t\t\tautoSurround: 'never', // 是否应自动环绕选择
\t\t\tcopyWithSyntaxHighlighting: true, // 是否应将语法突出显示复制到剪贴板中 即 当你复制到word中是否保持文字高亮颜色
\t\t\tcursorBlinking: 'smooth', // 光标动画样式
\t\t\tcursorSmoothCaretAnimation: 'on', // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
\t\t\tcursorStyle: 'line-thin', // "Block"|"BlockOutline"|"Line"|"LineThin"|"Underline"|"UnderlineThin" 光标样式
\t\t\tcursorSurroundingLines: 0, // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
\t\t\tcursorSurroundingLinesStyle: 'all', // "default" | "all" 光标环绕样式
\t\t\tcursorWidth: 2, // <=25 光标宽度
\t\t\tminimap: {
\t\t\t\tenabled: true, // 是否启用预览图
\t\t\t}, // 预览图设置
\t\t\t// 滚动设置
\t\t\tscrollbar: {
\t\t\t\tverticalScrollbarSize: 5, // 竖向滚动条宽度
\t\t\t\torizontalScrollbarSize: 5, // 横向滚动条宽度
\t\t\t\tarrowSize: 10, //箭头的大小（如果显示）。默认为11。注意：使用updateOptions()无法更新此选项。
\t\t\t\talwaysConsumeMouseWheel: false, // 始终消耗鼠标滚轮事件（始终在浏览器事件上调用preventDefault()和stopPropagation()）。默认为true。注意：使用updateOptions()无法更新此选项。
\t\t\t},
\t\t\tfolding: true, // 是否启用代码折叠
\t\t\tlinks: true, // 是否点击链接
\t\t\toverviewRulerBorder: true, // 是否应围绕概览标尺绘制边框
\t\t\trenderLineHighlight: 'gutter', // 当前行突出显示方式
\t\t\tscrollBeyondLastLine: false, //  设置编辑器是否可以滚动到最后一行之后,在真实内容显示出来完，在加一段空白显示
\t\t\treadOnly: false, // 是否为只读模式
\t\t\tlineNumbers: 'on',
\t\t\tlineNumbersMinChars: 4,
\t\t\ttheme: 'vs-dark', //官方自带三种主题vs, hc-black, or vs-dark
\t\t\tlanguage: 'json', // 用什么语言
\t\t\tfontSize: 13,
\t\t\troundedSelection: true, // 右侧不显示编辑器预览框
\t\t\tautoIndent: 'full', // 控制编辑器在用户输入、粘贴、移动或缩进行时是否应自动调整缩进。默认为高级选项。
\t\t\tformatOnType: true, // 在键入时是否自动格式化代码
\t\t\tformatOnPaste: true, //在粘贴时是否自动格式化代码。
\t\t\tvalue: '' // 默认展示的内容
\t\t})
\t\treturn 1
\t}
\treturn 0
}

/** 保存 */
const getEditorValue = useDebounceFn(() => {
\tconst text = monacoEditor.editor.getModels().at(0).getValue()
\temit('onChange', text)
}, 500)
let ctrlSum = 0

function saveKeyCtrl(e: KeyboardEvent) {
\tif (e.ctrlKey && e.key === 's') {
\t\te.preventDefault()
\t\t++ctrlSum
\t\tif (ctrlSum === 3) {
\t\t\twindow.$message.warning('请不要过于频繁保存，请等待 500ms')
\t\t\tctrlSum = 0
\t\t}
\t\tgetEditorValue()
\t}
}

/**  另存为 */
const fileName = ref('')

function saveAsFile() {
\tif (!fileName.value) return
\temit('onSaveAsFile', fileName.value)
}

const [modalFormShow, modalFormShowToggle] = useToggle()

/** 放大 */
const isFullscreen = ref(90)

function fullscreen() {
\tif (isFullscreen.value === 90) {
\t\tisFullscreen.value = 100
\t} else {
\t\tisFullscreen.value = 90
\t}
\t/** 方法找不到，看不到在哪  不黑找了 */
\t// @ts-ignore
\t// monacoEditor.editor.layout()
}

onUnmounted(() => {
\tdocument.removeEventListener('keydown', saveKeyCtrl, true)
\tmonacoEditor.editor.getModels().at(0).dispose()
})
</script>
<template>
\t<modal-form v-model:show="modalFormShow" title="另存为">
\t\t<n-form @keyup.enter="saveAsFile">
\t\t\t<n-form-item>
\t\t\t\t<n-input-group>
\t\t\t\t\t<n-input-group-label>原文件：</n-input-group-label>
\t\t\t\t\t<n-input placeholder="原文件:"/>
\t\t\t\t</n-input-group>
\t\t\t</n-form-item>
\t\t\t<n-input-group>
\t\t\t\t<n-input-group-label>新文件：</n-input-group-label>
\t\t\t\t<n-input v-model:value="fileName" placeholder="文件名:"/>
\t\t\t</n-input-group>
\t\t</n-form>
\t</modal-form>
\t<n-modal
\t\t\tv-model:show="modalShow" :show-icon="false" display-directive="show" class="modal-editor-vscode"
\t\t\t:style="[viewBack, { '--w': isFullscreen + 'vw', '--h': isFullscreen + 'vh' }]"
\t>
\t\t<div class="editor-vscode">
\t\t\t<header class="editor-vscode-header w-100">
\t\t\t\t
\t\t\t\t<n-button-group>
\t\t\t\t\t<n-button quaternary type="success" @click="() => getEditorValue()">
\t\t\t\t\t\t<template #icon>
\t\t\t\t\t\t\t<n-icon>
\t\t\t\t\t\t\t\t<SaveMultiple20Regular/>
\t\t\t\t\t\t\t</n-icon>
\t\t\t\t\t\t</template>
\t\t\t\t\t</n-button>
\t\t\t\t\t<n-button quaternary type="success" @click="() => modalFormShowToggle()">
\t\t\t\t\t\t<template #icon>
\t\t\t\t\t\t\t<n-icon>
\t\t\t\t\t\t\t\t<DocumentSave20Regular/>
\t\t\t\t\t\t\t</n-icon>
\t\t\t\t\t\t</template>
\t\t\t\t\t</n-button>
\t\t\t\t</n-button-group>
\t\t\t\t
\t\t\t\t<n-button-group>
\t\t\t\t\t<n-button
\t\t\t\t\t\t\tquaternary type="success" :native-focus-behavior="false" @focus="() => false"
\t\t\t\t\t\t\t@click="() => emit('update:show', false)"
\t\t\t\t\t>
\t\t\t\t\t\t<template #icon>
\t\t\t\t\t\t\t<n-icon>
\t\t\t\t\t\t\t\t<MinusOutlined/>
\t\t\t\t\t\t\t</n-icon>
\t\t\t\t\t\t</template>
\t\t\t\t\t</n-button>
\t\t\t\t\t<n-button quaternary type="success" @click="() => fullscreen()">
\t\t\t\t\t\t<template #icon>
\t\t\t\t\t\t\t<n-icon>
\t\t\t\t\t\t\t\t<FullscreenExitOutlined v-if="isFullscreen === 100"/>
\t\t\t\t\t\t\t\t<FullscreenOutlined v-else/>
\t\t\t\t\t\t\t</n-icon>
\t\t\t\t\t\t</template>
\t\t\t\t\t</n-button>
\t\t\t\t\t<n-button quaternary type="success" @click="() => emit('update:show', false)">
\t\t\t\t\t\t<template #icon>
\t\t\t\t\t\t\t<n-icon>
\t\t\t\t\t\t\t\t<CloseOutlined/>
\t\t\t\t\t\t\t</n-icon>
\t\t\t\t\t\t</template>
\t\t\t\t\t</n-button>
\t\t\t\t</n-button-group>
\t\t\t</header>
\t\t\t<n-spin :show="spinShow">
\t\t\t\t<main class="editor-vscode-content">
\t\t\t\t\t<div id="editor-vscode-view" class="w-100 h-100" ref="editorViewRef"></div>
\t\t\t\t</main>
\t\t\t</n-spin>
\t\t</div>
\t</n-modal>
</template>
<style lang="scss" scoped>
.editor-vscode {
\twidth: var(--w);
\theight: var(--h);
\tbackground-color: var(--modal-editror);
\tborder-radius: 3px 3px 7px 7px;
\t
\t&-header {
\t\tdisplay: flex;
\t\talign-items: center;
\t\tjustify-content: space-between;
\t}
\t
\t&-content {
\t\theight: calc(var(--h) - 34px - 3px);
\t}
}
</style>`

export default yuanma
