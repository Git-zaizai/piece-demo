import markdown from 'markdown-it'
import Shiki from '@shikijs/markdown-it'
import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// @ts-ignore
const __dirname = dirname(fileURLToPath(import.meta.url))
const createVueComponent = async () => {
	let codeDemoStr: any = await readFile(join(__dirname, './codeDemoComponent.vue'))
	codeDemoStr = codeDemoStr.toString()
	const codeReg = /<!--CODE-->/
	// const templateIndex = codeDemoStr.indexOf('</template>')
	// const script_style = codeDemoStr.slice(templateIndex + '</template>'.length)

	return (strs: string[]) => {
		return codeDemoStr.replace(codeReg, strs.join('\n'))
	}
}

const getCodeView = (leng: string, code: string): string => {
	return `
<div class="zai-code">
	<button class="zai-but-copy" @click="butCody" :style="{backgroundImage: codyMeg}"></button>
	<span class="lang">${ leng }</span>
	<div v-pre>${ code }</div>
</div>
  `
}


export default async () => {
	const getCodeDemo = await createVueComponent()
	const shiki = await Shiki({
		themes: {
			light: 'one-dark-pro',
			dark: 'one-dark-pro'
		}
	})
	const md = markdown()
	md.use(shiki)
	// md.enable('breaks')

	const docLoader = (fileContent: string) => {
		const mdStrs: string[] = []

		//   把 md 文件转换为 tokens
		const tokens = md.parse(fileContent)

		for (const token of tokens) {
			// 判断是 代码部分 自定义渲染
			if (token.tag === 'code') {
				mdStrs.push(getCodeView(token.info, md.render(
					'```' +
					token.info +
					'\n' +
					token.content +
					'```'
				)))
			} else if (token.type === 'inline' && token.content === '<br>') {
				mdStrs.push('<br>')
			} else {
				// 不是代码部分，renderer.render 将 token 转换成 HTML
				mdStrs.push(md.renderer.render([token]))
			}
		}


		const codeStr = getCodeDemo(mdStrs)
		// console.log(codeStr)
		return codeStr
	}

	return {
		name: 'vite-shiki-md-vu',
		enforce: 'pre',
		async transform(fileStr: string, id: string) {
			if (id.endsWith('.md')) {
				return {
					code: docLoader(fileStr),
					map: { mappings: '' }
				}
			}
		},
		async handleHotUpdate(ctx) {
			const { file } = ctx
			if (file.endsWith('.md')) {
				const code = docLoader(await ctx.read())
				/* 在vite4.3.0 直接这样就可以了 */
				ctx.read = () => code
			}
		}
	}
}