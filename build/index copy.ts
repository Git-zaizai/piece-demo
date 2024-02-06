import fs from 'node:fs'
import path from 'node:path'

import testcreateViteDeom from './test'

import markdown from 'markdown-it'
import Shiki from '@shikijs/markdown-it'

import getFilePath from './utils/getFilePath'

const getCodeDemo = (leng: string, code: string): string => {
  return `
  <div class="zai-code" :style="cssVars">
  <button class="zai-but-copy" @click="butCody"></button>
  <span class="lang">
    ${leng}
  </span>
  ${code}
  </div>
  `
}

const createViteMdToVue = async () => {
  const codeDemoVue_str = fs.readFileSync(path.join(__dirname, './codeDemo.vue')).toString()

  const shiki = await Shiki({
    themes: {
      light: 'one-dark-pro',
      dark: 'one-dark-pro'
    }
  })

  const mdit = markdown()
  mdit.use(shiki)

  // 自定义code部分渲染
  mdit.renderer.rules.code_inline = function (tokens, idx, options, env, self) {
    // 这里写你的自定义渲染逻辑
    const token = tokens[idx]
    console.log("🚀 ~ createViteMdToVue ~ token:", token)
    return `<custom-code>${token.content}</custom-code>`
  }

  return {
    name: 'vite-zaizai-vue-markdown',
    enforce: 'pre',
    transform(str: string, id: string) {
      if (id.endsWith('.md')) {
        const tokens: any[] = mdit.parse(str)
        // const codestr = tokens.filter(fv => fv.tag === 'code')
        const strs = []
        let i = 0
        for (const item of tokens) {
          i++
          if (item.tag === 'code') {
            const content = getCodeDemo(
              item.info,
              mdit.render('```' + item.info + '\n' + item.content + '```') as string
            )
            strs.push(content)
          } 
        }
        // 使用Markdown-it默认渲染器来渲染处理过的tokens
        let html = mdit.render(str)
        console.log("🚀 ~ transform ~ html:", html)
        let mdDemoVue =
          `
        <template>
        啊撒大声地
        </template>
        ` +
          '\n' +
          codeDemoVue_str

        // let html = mdit.render(str)

        return {
          code: mdDemoVue,
          map: { mappings: '' }
        }
      }
    }
  }
}

export default createViteMdToVue
