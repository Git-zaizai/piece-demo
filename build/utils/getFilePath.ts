import fs from 'node:fs'
import path from 'node:path'

/** 把字符串中的 import ** from '***' 提取 from 后面的路径 */
const getStrFile = (contents: string[][]): string[] => {
  let paths = []
  for (const cont of contents) {
    for (const str of cont) {
      if (str.includes('import')) {
        let from = str
          .slice(str.indexOf('from') + 4)
          .trim()
          .replace(/'/g, '')
        paths.push(from)
      }
    }
  }
  return paths
}

/** 把路径转换为绝对路径 */
const pathToAbsolutePath = (paths: string[], id: string): string[] => {
  let contentid: any = id.split('/')
  contentid.pop()
  contentid = contentid.join('/')
  let phs = []
  const cwd = path.join(process.cwd(), '/src')
  for (const ph of paths) {
    if (ph.includes('@')) {
      phs.push(path.join(cwd, ph.replace('@', '')))
    } else {
      phs.push(path.join(contentid, ph))
    }
  }
  return phs
}

const getFilePath = (tokens: any[], id: string) => {
  const contents = tokens.filter(v => v.info === 'vue demo').map(mv => mv.content.split('\n'))
  const froms = getStrFile(contents)
  const paths = pathToAbsolutePath(froms, id)
  return paths
}

export default getFilePath
