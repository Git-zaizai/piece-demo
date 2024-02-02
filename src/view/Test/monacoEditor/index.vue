<script setup lang="ts" name="monacoEditor-view">
import { useToggle } from '@vueuse/core'
import editor from '@/components/monaco-editor-modal.vue'

const [editorshow, editorshowToggle] = useToggle(false)


import yuanma from './yuanma.js'

function downloadCode() {
	const blob = new Blob([yuanma], { type: "text/plain" })
	const downloadLink = document.createElement("a")
	// 设置下载链接的属性
	const url = URL.createObjectURL(blob)
	downloadLink.href = url
	downloadLink.download = "monaco-editor-modal.vue";
	
	// 将下载链接添加到页面中（这一步可以省略，不过添加到页面中用户可以点击链接下载，而不是通过编程触发下载）
	document.body.appendChild(downloadLink)
	
	// 模拟点击下载链接
	downloadLink.click();
	
	// 在完成下载后，移除下载链接（如果没有将其添加到页面中，则可以省略此步骤）
	document.body.removeChild(downloadLink)
	URL.revokeObjectURL(url)
}
</script>
<template>
	<div class="viwe flex-fdc-alc-juc w-100">
		<n-button type="primary" @click="() => editorshowToggle()">
			打开编辑窗口
		</n-button>
		<br/>
		<n-button type="primary" @click="downloadCode">
			下载源代码
		</n-button>
		<br/>
		<br/>
		<h4>
			可以查看效果和源码，vue 没有高亮，建议下载文件后用编辑器打开
		</h4>
		<h4>
		<!-- 	没多少功能，就几个然后放大还有bug，也不是没有办法，
			<br/>
			方案一：重新实例化一个monaco-editor，宽高就能自动化大小窗口，
			<br/>
			方案二：调用内部api这个是肯定有的，但是找不到，文档太他妈难看了，搜索搜不到，找到的记得说一声
			<br/>
			方案三：手动把容器放大，还要重新计算所有的东西，黑麻烦咯 -->
		</h4>
		<editor v-model:show="editorshow" :value="yuanma" language="vue"/>
	</div>
</template>
<style scoped lang="scss">
.viwe {
	height: $layout-content;
}
</style>