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
