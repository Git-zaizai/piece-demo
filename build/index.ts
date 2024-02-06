import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import createVuePlugin from '@vitejs/plugin-vue'

import testcreateViteDeom from './test'

import markdown from 'markdown-it'
import Shiki from '@shikijs/markdown-it'

import getFilePath from './utils/getFilePath'

const getCodeDemo = (leng: string, code: string): string => {
  return `
  <div class="zai-code" :style="cssVars">
  <button class="zai-but-copy" @click="butCody" :style="{backgroundImage: codyMeg}"></button>
  <span class="lang">
    ${leng}
  </span>
  <div v-pre>${code}</div>
  </div>
  `
}

const getCodeTemplage = strs => {
  return `<template><div class="md-view">${strs.join('\n')}</div></template>`
}

import docLoader from './docLoader'

const vuePlugin = createVuePlugin({
  include: [/\.vue$/, /\.md$/]
})

const createViteMdToVue = async () => {
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
  const codeDemoVue_str = fs.readFileSync(path.join(__dirname, './codeDemo.vue')).toString()

  const shiki = await Shiki({
    themes: {
      light: 'one-dark-pro',
      dark: 'one-dark-pro'
    }
  })

  const md = markdown()
  md.use(shiki)

  return {
    name: 'vite-zaizai-md-vue',
    enforce: 'pre',
    async transform(_, id: string) {
      if (id.endsWith('.md')) {
        /* const md_str_s = []

        const tokens = md.parse(str)
        for (const token of tokens) {
          if (token.tag === 'code') {
            md_str_s.push(getCodeDemo(token.info, md.render('```' + token.info + '\n' + token.content + '```')))
          } else {
            md_str_s.push(md.renderer.render([token]))
          }
        }
        fs.writeFileSync(path.join(__dirname, './sdsd.vue'), getCodeTemplage(md_str_s) + codeDemoVue_str) */
        const code = await docLoader(id)
        return {
          code: code,
          map: { mappings: '' }
        }
      }
    },
    async handleHotUpdate(ctx) {
      const { file } = ctx
      if (file.endsWith('.md')) {
        const code = await docLoader(file)
        console.log('🚀 ~ handleHotUpdate ~ code:', code)
        return vuePlugin.handleHotUpdate({
          ...ctx,
          read: () => code
        })
      }
    }
  }
}

export default createViteMdToVue
