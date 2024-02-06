import markdown from 'markdown-it'
import Shiki from '@shikijs/markdown-it'
import fs from 'node:fs'
import path from 'node:path'

let item = fs.readFileSync(path.join(process.cwd(), './sadasd.md')).toString()

const regex = /<template>([\s\S]*?)<\/template>/

const asdastoken = JSON.parse(fs.readFileSync(path.join(process.cwd(), './lkajshd.json')).toString())
;(async () => {
  const shiki = await Shiki({
    themes: {
      light: 'one-dark-pro',
      dark: 'one-dark-pro'
    }
  })

  const md = markdown()
  md.use(shiki)

  let tokens = md.parse(item)
  console.log("🚀 ~ ; ~ tokens:", tokens)
 /*  const strs = []

  const getCodeDemo = (leng, code) => {
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

  let i = 0
  for (const item of tokens) {
    i++
    if (item.tag !== 'code') {
      strs.push(md.renderer.render([item]))
    } else {
      // strs.push(getCodeDemo(item.info, md.renderer.render(item)))
      // strs.push(getCodeDemo(item.info, md.renderer.render([item])))
      // console.log(md.renderer.render([item]))
      const content = getCodeDemo(item.info, md.render('```' + item.info + '\n' + item.content + '```'))
      strs.push(content)
    }
  }
  // const html = md.render(item)
  fs.writeFileSync(path.join(process.cwd(), './asdasdasd.html'),strs.join('')) */
})()
