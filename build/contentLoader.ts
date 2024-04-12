import { createMarkdownRenderer } from './markdown/markdown'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { defaultCodeVue } from './getCodeComponnent'

export default async function contentLoader() {
  const md = await createMarkdownRenderer('/', {
    theme: 'one-dark-pro'
  })

  const demoTemplate = await defaultCodeVue()

  return {
    name: 'vite-shiki-md-vue',
    enforce: 'pre',
    async transform(fileStr: string, id: string) {
      if (id.endsWith('.md')) {
        const code = md.render(fileStr)
        await writeFile(path.join(path.resolve(), './build/components/code.vue'), code)
        return {
          code: demoTemplate(code),
          map: { mappings: '' }
        }
      }
    },
    async handleHotUpdate(ctx) {
      const { file } = ctx
      if (file.endsWith('.md')) {
        let fileConent = await readFile(file)
        const code = demoTemplate(md.render(fileConent))
        /* 在vite4.3.0 直接这样就可以了 */
        ctx.read = () => code
      }
    }
  }
}
