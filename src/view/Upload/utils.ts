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

export async function mergeUpload(foamDataList: FormData[], callback: (i: number) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    let index = 0
    const errMap = []
    const upload = async (i?: number) => {
      const at = i ?? index
      if (at >= foamDataList.length) return
      foamDataList[at].append('id', at.toString())
      try {
        await http.post('/upload-plus', foamDataList[at])
        callback(index)
        if (at >= foamDataList.length) {
          return resolve()
        }
        index++
        return upload()
      } catch {
        if (errMap.length >= 3) {
          reject()
        }
        errMap.push(foamDataList[at])
        return upload(at)
      }
    }

    for (let r = 0; r < 6; r++) {
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