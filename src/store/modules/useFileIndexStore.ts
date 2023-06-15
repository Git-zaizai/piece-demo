interface State {
    /* 文件上传大小 */
    fileMaxSize: number
    /* 文件上传配置 local key */
    LoaclUploadConfigName: string
    /* 文件上传记录 local key */
    LocalUploadListName: string
    /* 本地保存上传记录大小现在 */
    LocalUploadListLength: number
}

export const useFileIndexStore = defineStore('fileIndex', {
    state: (): State => ({
        fileMaxSize: 209715200,
        LoaclUploadConfigName: 'uploadConfig',
        LocalUploadListName: 'LocalFileList',
        LocalUploadListLength: 100,
    }),
    actions: {}
})