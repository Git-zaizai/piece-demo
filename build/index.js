import MarkdownIt from 'markdown-it'
import shiki from '@shikijs/markdown-it'

const md = MarkdownIt()

const createDemoPlugin = async () => {
  md.use(
    await shiki({
      themes: {
        light: 'one-dark-pro',
        dark: 'one-dark-pro'
      }
    })
  )
  const naiveDemoVitePlugin = {
    name: 'demo-vite',
    enforce: 'pre',
    async transform(str, id) {
      console.log('🚀 ~ transform ~ id:', id)
      /* if (fileRegex.test(id)) {
        return getTransformedVueSrc(id)
      } */

      if (id.endsWith('md')) {
        const mdRender = md.render(str)
        console.log('🚀 ~ transform ~ mdRender:', mdRender)
        const code = `<template>
          <div>
          ${mdRender}
          </div>
        \n </template>`
        console.log('🚀 ~ transform ~ code:\n', code, '\n')
        return {
          code: code,
          map: null
        }
      }
    },
      /*   async handleHotUpdate(ctx) {
    console.log("🚀 ~ handleHotUpdate ~ ctx:", ctx)
  if (id.endsWith('md')) {
        const mdRender = md.render(str)
        console.log('🚀 ~ transform ~ mdRender:', mdRender)
        const code = `<template>
          <div>
          ${mdRender}
          </div>
        \n </template>`
        console.log('🚀 ~ transform ~ code:\n', code, '\n')
        return {
          code: code,
          map: null
        }
      } 
    }*/
  }
  return naiveDemoVitePlugin
}

export default createDemoPlugin
