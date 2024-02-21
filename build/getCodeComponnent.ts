import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
export const createVueComponent = async () => {
	let codeDemoStr: any = await readFile(join(__dirname, './codeDemoComponent.vue'))
	codeDemoStr = codeDemoStr.toString()
	const codeReg = /<!--CODE-->/
	return (stars: string[] | string) => {
		// @ts-ignore
		const replace_str = Array.isArray(stars) ? stars.join('\n') : stars
		return codeDemoStr.replace(codeReg, replace_str)
	}
}

export const getCodeView = (lang: string, code: string): string => {
	return `<div class="zai-code">
	<button class="zai-but-copy" @click="butCody" :style="{backgroundImage: codyMeg}"></button>
	<span class="lang">${ lang }</span>
	<div v-pre>${ code }</div>
</div>`
}