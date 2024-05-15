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