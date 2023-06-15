import type { fileItem, fileTree } from '@/components/inputFile'
import type { AxiosResponse } from 'axios'

export interface uploadConfigItem {
    id: number,
    label: string,
    modelv: boolean,
    isPopconfirm: boolean,
    popConFirmShow?: boolean,
    tooltiptxt: string,
    OnUpdateValue: (value: boolean) => void
}

export interface localUploadConfigItem {
    id: number
    modelv: boolean
}

export interface FileChangeData {
    files?: fileItem[],
    fileTree?: fileTreeItem
}

export type FilesItem = fileItem

export interface uploadFileListItem {
    id: number
    name: string
    downloadUrl: string
    imgUrl: string
    status: string
    percentage: number
}

export interface fileTreeItem {
    name?: string
    path?: string
    isfile?: boolean
    children?: Array<fileTree>
}

interface responseData {
    code: number
    url: string
    msg: string
}

export interface CallbackConfig {
    onUploadProgress: (progressEvent: any) => void
    resolve: (data: AxiosResponse<responseData>) => responseData
    reject: (error: any) => any
}


export interface LocalUploadListItem {
    downloadUrl: string
    name: string
}

interface allListItem extends LocalUploadListItem {
    isImg: boolean
}

export interface GetLocalUploadList {
    allList: allListItem[],
    images: allListItem[]
}

