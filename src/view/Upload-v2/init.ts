import type { localUploadConfigItem, uploadConfigItem, GetLocalUploadList } from './types'
import type { Ref } from 'vue'
import { useFileIndexStore } from '@/store/modules/useFileIndexStore'
import Storage from '@/utils/Storage'
import { isImage } from './utils'

export const initUploadConfig = (): Ref<localUploadConfigItem[]> => {
    const fileIndexStore = useFileIndexStore()
    const data = Storage.get(fileIndexStore.LoaclUploadConfigName)
    if (data) return ref(data)
    return ref([ { id: 0, modelv: false } ])
}

/**
 * @function createFileConfig 初始化数据 从本地获取数据在进行数据合并
 * @param fileConfigArray
 * */
export const initMergeUploadConfig = (fileConfigArray: uploadConfigItem[]): Ref<uploadConfigItem[]> => {
    const fileIndexStore = useFileIndexStore()
    const results = ref<uploadConfigItem[]>(fileConfigArray)
    const local: localUploadConfigItem[] = Storage.get(fileIndexStore.LoaclUploadConfigName)
    if (local === null) return results
    results.value = fileConfigArray.map(item => {
        const localItem = local.find(v => v.id === item.id)
        return Object.assign(item, localItem)
    })
    return results
}

export const initGetLoaclUploadList = (): GetLocalUploadList => {
    const fileIndexStore = useFileIndexStore()
    const result: GetLocalUploadList = reactive({
        allList: [],
        images: []
    })
    const data = Storage.get(fileIndexStore.LocalUploadListName)
    if (data === null) return result
    for (let i = data.length - 1; i >= 0; i--) {
        const nodeItem = { downloadUrl: data[i].downloadUrl, name: data[i].name, isImg: isImage(data[i].name) }
        result.allList.push(nodeItem)
        if (nodeItem.isImg) {
            result.images.push(nodeItem)
        }
    }
    return result
}

