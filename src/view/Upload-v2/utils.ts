import request from '@/api/request'
import Storage from '@/utils/Storage'
import { useFileIndexStore } from '@/store/modules/useFileIndexStore'
import { CallbackConfig, LocalUploadListItem, GetLocalUploadList } from './types'

export const isImage = (name: string): boolean => {
    const fileType = name.split('.').pop()
    return ['png', 'jpg', 'jpeg', 'svg', 'gif', 'JPG', 'PNG', 'JPEG', 'SVG'].includes(fileType)
}

/**
 * @function readyUpload 返回一个请求函数
 * */
export function readyUpload(formdata: FormData, callbackConfig: CallbackConfig) {
    return new Promise((resolve, reject) => {
        request.post('/upload', formdata, {
            onUploadProgress: callbackConfig.onUploadProgress
        }).then(res => {
            resolve(callbackConfig.resolve(res))
        }).catch(err => {
            reject(callbackConfig.reject(err))
        })
    })
}

/**
 *@function insertLocal 保存上传记录到本地
 * */
export function insertLocal(list: LocalUploadListItem[]) {
    const fileIndexStore = useFileIndexStore()
    let loaclList: LocalUploadListItem[] = Storage.get(fileIndexStore.LocalUploadListName)
    if (loaclList === null) {
        loaclList = list
    } else {
        loaclList.push(...list)
        loaclList = loaclList.slice(0, fileIndexStore.LocalUploadListLength)
    }
    Storage.set(fileIndexStore.LocalUploadListName, loaclList)
}

/**
 * @function getLocalTheLatest 获取最新的本地上传记录
 * */
export function getLocalTheLatest(len: number): GetLocalUploadList {
    const fileIndexStore = useFileIndexStore()
    const loaclList: LocalUploadListItem[] = Storage.get(fileIndexStore.LocalUploadListName)
    const allList = [], images = []
    loaclList.slice(len - 1, loaclList.length).forEach(item => {
        const nodeItem = { downloadUrl: item.downloadUrl, name: item.name, isImg: isImage(item.name) }
        allList.push(nodeItem)
        if (nodeItem.isImg) {
            images.push(nodeItem)
        }
    })
    return { allList, images }
}
