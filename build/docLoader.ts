import markdown from 'markdown-it'
import Shiki from '@shikijs/markdown-it'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import { readFile } from 'node:fs/promises'

let shiki
let md

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const codeDemoVue_str = fs.readFileSync(path.join(__dirname, './codeDemo.vue')).toString()

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

const getCodeTemplage = (strs: string[]) => {
  return `<template><div class="md-view">${strs.join('\n')}</div></template>`
}

export default async (id: string): Promise<string> => {
  let str: any = await readFile(id)
  str = str.toString()
  if (!md || !shiki) {
    // 初始化 shiki 和 md
    shiki = await Shiki({
      themes: {
        light: 'one-dark-pro',
        dark: 'one-dark-pro'
      }
    })
    md = markdown()
    md.use(shiki)
  }
  const md_str_s: string[] = []

  //   把 md 文件转换为 tokens
  const tokens = md.parse(str)
  for (const token of tokens) {
    // 判断是 代码部分 自定义渲染
    if (token.tag === 'code') {
      md_str_s.push(getCodeDemo(token.info, md.render('```' + token.info + '\n' + token.content + '```')))
    } else {
      // 不是代码部分，renderer.render 将 token 转换成 HTML
      md_str_s.push(md.renderer.render([token]))
    }
  }

  const template = getCodeTemplage(md_str_s)
  return template + codeDemoVue_str
}
