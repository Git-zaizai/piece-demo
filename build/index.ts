import testcreateViteDeom from './test'

import markdown from 'markdown-it'
import Shiki from '@shikijs/markdown-it'

import getFilePath from './utils/getFilePath'

const createViteMdToVue = async () => {
  const shiki = await Shiki({
    themes: {
      light: 'one-dark-pro',
      dark: 'one-dark-pro'
    }
  })

  const mdit = markdown()
  mdit.use(shiki)

  return {
    name: 'vite-zaizai-vue-markdown',
    enforce: 'pre',
    transform(str: string, id: string) {
      // console.log('🚀 ~ transform ~ id:', id)
      if (id.endsWith('.md')) {
        const tokens: any[] = mdit.parse(str)
        
        let html = mdit.render(str)
        return {
          code: `<template>
          <h1>${id}</h1>
          <div>${html}</div>
          </template>`,
          map: { mappings: '' }
        }
      }
    }
  }
}

export default createViteMdToVue
