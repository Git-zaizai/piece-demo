# 使用 `vitepress` 的转换器

需要的依赖

```ts
pmpm add -D
 @mdit-vue/plugin-component
 @mdit-vue/plugin-frontmatter
 @mdit-vue/plugin-headers
 @mdit-vue/plugin-sfc
 @mdit-vue/plugin-title
 @mdit-vue/plugin-toc
 @mdit-vue/shared
 markdown-it
 markdown-it-anchor
 markdown-it-attrs
 markdown-it-emoji
 shiki
 markdown-it-container
 nanoid
 picocolors
 fs-extra
```

## 主函数

::: warning 注意
虽然使用 `vitepress` 的转换器但是其他部分并没有扣出来，需要自行编写模版
:::

```ts
import { createMarkdownRenderer } from './markdown/markdown'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { defaultCodeVue } from './getCodeComponnent'
import {
	type MarkdownEnv,
} from './markdown/shared/shared'
export default async function contentLoader() {
	const md = await createMarkdownRenderer('/', {
		theme: 'one-dark-pro'
	})

    // 获取模版
	const demoTemplate = await defaultCodeVue()

	return {
		name: 'vite-shiki-md-vue',
		enforce: 'pre',
		async transform(fileStr: string, id: string) {
			if (id.endsWith('.md')) {
				const end: MarkdownEnv = {
					path: id,
					relativePath: '',
					cleanUrls: false,
					includes: [],
					realPath: ''
				}
				let code = md.render(fileStr, end)
				code = demoTemplate(code)
				if (end.sfcBlocks && end.sfcBlocks.scriptSetup && end.sfcBlocks.scriptSetup.content) {
					code = code + '\n' + end.sfcBlocks.scriptSetup.content
				}

				return {
					code,
					map: { mappings: '' }
				}
			}
		},
		async handleHotUpdate(ctx) {
			const { file } = ctx
			if (file.endsWith('.md')) {
				let fileConent = await readFile(file)
				const end: MarkdownEnv = {
					path: file,
					relativePath: '',
					cleanUrls: false,
					includes: [],
					realPath: ''
				}
				let code = md.render(fileConent, end)
				code = demoTemplate(code)
				if (end.sfcBlocks && end.sfcBlocks.scriptSetup && end.sfcBlocks.scriptSetup.content) {
					code = code + '\n' + end.sfcBlocks.scriptSetup.content
				}

				/* 在vite4.3.0 直接这样就可以了 */
				ctx.read = () => code
			}
		}
	}
}

```

## `defaultCodeVue`函数

```ts
export const defaultCodeVue = async () => {
	let codeDemoStr: any = await readFile(join(__dirname, './components/codeVueDemo.vue'))
	codeDemoStr = codeDemoStr.toString()
	const codeReg = /<!--CODE-->/
	return (code: string) => {
		return codeDemoStr.replace(codeReg, code)
	}
}
```

```vue
<template>
	<MdToVueLayout>
		<div class="vp-doc _zh_guide_what-is-vitepress">
			<div class="vp-doc has-sidebar has-aside">
				<!--CODE-->
			</div>
		</div>
	</MdToVueLayout>
</template>
```

## `MdToVueLayout` 组件说明

`MdToVueLayout`是一个容器组件，`md.render()`方法会返回一段字符串 `html`，下图所示，

![img.png](img.png)

把这段代码塞入你准备的容器组件，就可以了

`MdToVueLayout` template 部分，太长了就只展示这样

```vue
<template>
	<div class="vp-view" ref="vpviewRef" @click="bindLinkClk" @scroll="vpViewOnScroll">
		<div class="content">
			<slot></slot>
		</div>
		<div class="aside">
			<div class="aside-container">
				<div class="aside-content">
					<AsideOutline :headers="headers" :top="asideTop" />
				</div>
			</div>
		</div>
	</div>
</template>
```

## 需要的 `css`

```css
@import url('./utils.css');
@import url('./fonts.css');
@import url('./icons.css');
@import url('./components/custom-block.css');
@import url('./components/vp-code-group.css');
@import url('./components/vp-code.css');
@import url('./components/vp-doc.css');
@import url('./components/vp-sponsor.css');
```