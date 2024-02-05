const createViteDeom = () => {
    return {
      name: 'vite-zaizai-vue-markdown',
      enforce: 'pre',
      transform(str: string, id: string) {
        if (id.endsWith('.md')) {
          const regex = /<template>([\s\S]*?)<\/template>/
          const templageStr = str.match(regex)[1]
          console.log("🚀 ~ transform ~ templageStr:", templageStr)
  
          const setupIndex = str.indexOf('<script setup>')
          const setupStr = str.slice(setupIndex)
          const resStr = `<template>
          <h1>${id}</h1>
          ${templageStr}
          </template>`
          const code = resStr + setupStr
          console.log("🚀 ~ transform ~ setupStr:", setupStr)
         /*  return {
            code: code,
            map: { mappings: '' }
          } */
        }
      }
    }
  }
  
  export default createViteDeom
  