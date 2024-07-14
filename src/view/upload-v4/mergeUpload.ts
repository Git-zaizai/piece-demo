import { http } from '@/api'

export interface Shards {
    hash: string
    index: number
    shard: Blob
}

function getCPUS() {
    return navigator?.hardwareConcurrency || 6
}

// 获取分片文件
function getMergeFile(file: File): Blob[] {
    const blobArr = []
    const blobSize = 1024 * 512 // 512KB
    let i = 0
    while (i < file.size) {
        blobArr.push(file.slice(i, i + blobSize))
        i += blobSize
    }
    if (i < file.size) {
        blobArr.push(file.slice(i, i + blobSize))
    }
    return blobArr
}


function computeShardHash(merges: Blob[]): Promise<Shards[]> {
    return new Promise((resolve) => {
        // const result = new Array(merges.length).fill(null)
        const result = []
        let mi = 0
        const cpus = Math.min(getCPUS(), merges.length)
        for (let i = 0; i < cpus; i++) {
            const worker = new Worker(new URL('./worker-md5.js', import.meta.url).href)
            worker.postMessage({
                index: mi,
                file: merges[mi]
            })
            ++mi
            worker.onmessage = (event: MessageEvent<any>) => {
                // result[event.data.index] = { ...event.data, shard: merges[event.data.index] }
                result.push({ ...event.data, shard: merges[event.data.index] })
                if (mi < merges.length) {
                    worker.postMessage({
                        index: mi,
                        file: merges[mi]
                    })
                    ++mi
                } else {
                    worker.terminate()
                    if (result.length === merges.length) {
                        resolve(result.sort((a, b) => a.index - b.index))
                    }
                }

            }
        }
    })
}


export function shardsUpload(nameHash: string, file: File, callback: (percentage: number) => void): Promise<Shards[]> {
    return new Promise(async (resolve, reject) => {
        // 计算每个分片的哈希值
        const mergeHashs = await computeShardHash(getMergeFile(file))
        let index = 0
        const success = []
        const errMap = []
        let chunkSize = 0,
            totalSize = file.size
        const upload = async (i?: number) => {
            const at = i ?? index
            index++
            if (at > mergeHashs.length - 1) return
            try {
                const formdata = new FormData()
                formdata.append('fileNameMD5', nameHash)
                formdata.append('file', mergeHashs[at].shard)
                formdata.append('hash', mergeHashs[at].hash)
                formdata.append('index', mergeHashs[at].index.toString())

                await http.post('/shards-upload', formdata)
                success.push(mergeHashs[at])

                chunkSize += mergeHashs[at].shard.size
                callback && callback(Math.ceil((chunkSize / totalSize) * 100))
                /** 在这里判断保证全部完成后才能退出 */
                if (success.length === mergeHashs.length) {
                    return resolve(success)
                }
                const findErrIndex = errMap.findIndex(v => v === at)
                if (findErrIndex > -1) {
                    errMap.splice(findErrIndex, 1)
                }
                return upload()
            } catch(error) {
                console.log(error);
                
                if (errMap.length >= 6) {
                    return reject(0)
                }
                errMap.push(at)
                return upload(at)
            }

        }
        for (let r = 0, leng = Math.min(mergeHashs.length, 6); r < leng; r++) {
            upload()
        }
    })
}


export interface UploadProps {
    file: File
    path?: string
    callback: (percentage: number) => void
}

export async function upload(props: UploadProps): Promise<{ url: string, name: string }> {
    const { file, path, callback } = props
    // @ts-ignore
    const fileNameMD5 = window.SparkMD5.hash(file.name + Date.now())
    const shardlist = await shardsUpload(fileNameMD5, file, callback)
    const resp = await http.post<any>('/merge-shards', {
        ph: path,
        fileNameMD5,
        name: file.name,
        shards: shardlist.map(v => ({ id: v.index, hash: v.hash }))
    })
    resp.data.data.fileNameMD5 = fileNameMD5

    return resp.data.data
}