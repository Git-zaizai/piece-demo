import { createMarkdownRenderer } from './markdown/markdown'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { defaultCodeVue } from './getCodeComponnent'
import {
  type MarkdownEnv,
} from './markdown/shared/shared'


/***

 需要的依赖
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

 **/

/***
 * 
 * E:\gitclone\xxxxxxxxxxxx\piece-demo\node_modules\@mdit-vue\plugin-component\dist\index.mjs
 * 
 * 输出内容
 * @mdit-vue/plugin-component
<script setup>
import { ref } from 'vue'

const count = ref(0)     
</script>
 * 
 */
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
