import markdown from 'markdown-it'
import { getHighlighter, bundledLanguages } from 'shiki'
import { createVueComponent, getCodeView } from './getCodeComponnent'

export default async () => {
	const getVueCode = await createVueComponent()
	// 创建高亮渲染器
	const highlighter = await getHighlighter({
		themes: ['one-dark-pro'],
		// @ts-ignore
		langs: Object.keys(bundledLanguages)
	})
	let transformers = null
	const md = markdown({}, {
		linkify: true,
		breaks: true,
		xhtmlOut: true,
	})

	// 保存原有的规矩函数
	const code_block = md.renderer.rules.code_block
	const fence = md.renderer.rules.fence

	// 重写函数
	// @ts-ignore
	function codeRules(tokens: any, idx: number, options: any, env: any, slf: any): string {
		const lang = tokens[idx].info
		console.log('lang',lang)
		if (!transformers) {
			transformers = {
				name: "@shikijs/markdown-it:block-class",
				code(node) {
					node.properties.class = `language-${ options.lang }`;
				}
			}
		}

		const code_html = highlighter.codeToHtml(tokens[idx].content,
			{
				lang,
				theme: 'one-dark-pro',
				transformers: [
					transformers
				]
			})

		return getCodeView(lang, code_html)
	}

	md.renderer.rules.fence = codeRules
	md.renderer.rules.code_block = codeRules

	return (str: string) => {
		return getVueCode(md.render(str))
	}
}