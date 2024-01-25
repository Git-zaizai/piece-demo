import { http } from '@/api'

export const isImage = (name: string): boolean => {
  const fileType = name.split('.').pop()
  return [
    'png',
    'jpg',
    'jpeg',
    'svg',
    'gif',
    'JPG',
    'PNG',
    'JPEG',
    'SVG'
  ].includes(fileType)
}

export function fileBlob(file: File): Blob[] {
  const blobArr = []
  const blobSize = 1024 * 1024
  for (let i = 0; i < file.size; i += blobSize) {
    blobArr.push(file.slice(i, i + blobSize))
  }
  return blobArr
}

export function getFormData(file): FormData[] {
  const blobList = fileBlob(file.file)
  return blobList.map(item => {
    const formdata = new FormData()
    formdata.append('name', file.file.name)
    formdata.append('file', item)
    return formdata
  })
}

export async function mergeUpload(foamDataList: FormData[], callback: (i: number) => void): Promise<number> {
  return new Promise((resolve, reject) => {
    let index = 0
    const success = []
    const errMap = []
    const upload = async (i?: number) => {
      const at = i ?? index
      index++
      if (at > foamDataList.length - 1) return
      try {
        foamDataList[at].append('id', at.toString())
        await http.post('/upload-plus', foamDataList[at])
        callback(index)
        /** 在这里判断保证全部完成后才能退出 */
        if (success.length === foamDataList.length - 1) {
          return resolve(success.length)
        }
        success.push(at)
        return upload()
      } catch {
        if (errMap.length >= 3) {
          return reject(-1)
        }
        errMap.push(at)
        return upload(at)
      }
    }

    for (let r = 0, leng = Math.min(foamDataList.length, 6); r < leng; r++) {
      upload()
    }
  })
}

export function processingPath(files, rootPath: string): string[] {
  const phs = []
  for (const { path } of files) {
    let ph = path.split('/')
    ph.pop()
    ph = ph.join('/')
    if (ph.length !== rootPath.length) {
      phs.push(ph)
    }
  }
  return phs
}