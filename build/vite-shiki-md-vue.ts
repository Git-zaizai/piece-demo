import createLoader from './createLoader'
import { readFile } from 'node:fs/promises'
export default async () => {
	const mdLoader = await createLoader()
	return {
		name: 'vite-shiki-md-vue',
		enforce: 'pre',
		transform(fileStr: string, id: string) {
			if (id.endsWith('.md')) {
				const code = mdLoader(fileStr)
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
				const code = mdLoader(fileConent.toString())
				/* 在vite4.3.0 直接这样就可以了 */
				ctx.read = () => code
			}
		}
	}
}