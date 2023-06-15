<template>
  <div class="upload-index">
    <div class="upload-input-file">
      <input-file @file-change="fileChange" :webkitdirectory="uploadConfig[0].modelv"></input-file>
    </div>

    <n-button class="ui-but" type="primary" strong :disabled="uploadButtonDisabled" @click="uploadClick">
      <template #icon>
        <n-icon :component="AirplaneTakeOff16Regular"/>
      </template>
      起飞
    </n-button>

    <n-el class="ui-footer">
      <div class="ui-footer-left">
        <upload-historic-record></upload-historic-record>
      </div>
      <div class="ui-footer-right">
        <upload-list :is-img-clk="isImgClick"
                     :file-list="state.uploadList"
                     @del-file="delFilecall"
                     @again-upload="againUploadAll"></upload-list>
      </div>
    </n-el>
    <upload-config @update-upload-config="updateUploadConfig"></upload-config>
  </div>
</template>

<script name="upload-index" lang="ts" setup>
import { deleteFIleTreeItem, DropResult, fileTree, InputFile } from '@/components/inputFile'
import UploadConfig from './UploadConfig.vue'
import UploadList from './UploadList.vue'
import UploadHistoricRecord from './UploadHistoricRecord.vue'
import { AirplaneTakeOff16Regular } from '@vicons/fluent'
import { useFileIndexStore } from '@/store/modules/useFileIndexStore'
import type { FilesItem, fileTreeItem, localUploadConfigItem, LocalUploadListItem, uploadFileListItem } from './types'
import { initUploadConfig } from './init'
import { insertLocal, isImage, readyUpload } from './utils'
import { createDirectory } from '@/api'
import apiConfig from '@/api/config'

const fileIndexStore = useFileIndexStore()

/** 上传文件配置 **/
const uploadConfig = initUploadConfig()
// 判断是否需要查看图片 就是纯前端查看图片
const isImgClick = computed(() => {
  return uploadConfig?.value[2]?.modelv ?? false
})

function updateUploadConfig(value: localUploadConfigItem[]) {
  uploadConfig.value = value
}

//给上传列表的ID
let fileID = 0
//上传列表数据
const state: {
  uploadList: uploadFileListItem[]
} = reactive({
  uploadList: []
})
// const uploadList = ref<uploadFileListItem[]>([])
let files: FilesItem[] = []
let fileTree: fileTreeItem = {}

/**
 * @function fileChange 监听用户加载了文件
 * */
function fileChange(data: DropResult) {
  const size = data.filesArray.reduce((total, currentValue) => total + currentValue.file.size, 0)
  if (size > fileIndexStore.fileMaxSize) {
    window.$dialog.warning({
      title: '警告',
      content: '文件限制200MB',
      positiveText: '确定',
    })
    return
  }
  state.uploadList = data.filesArray.map<uploadFileListItem>(item => {
    let imgUrl = null
    if (!isImgClick.value && isImage(item.file.name)) {
      imgUrl = URL.createObjectURL(item.file)
    } else {
      imgUrl = ''
    }
    return ({
      id: ++fileID,
      name: item.file.name,
      downloadUrl: '',
      imgUrl,
      status: 'success',
      percentage: 0,
    })
  })
  files = data.filesArray.map(mvitem => {
    const valueSplit = mvitem.path.split('/')
    valueSplit.shift()
    mvitem.path = valueSplit.join('/')
    return mvitem
  })
  //是否开启了 上传目录保持一致
  if (uploadConfig.value[1]?.modelv) {
    //文件树
    fileTree = data.DirectoryTree
  }
}

/**
 * @function delFilecall 删除文件
 * */
function delFilecall(id: number) {
  const index = state.uploadList.findIndex(fv => fv.id === id)
  const name = state.uploadList[index].name
  const filesIndex = files.findIndex(filesItem => filesItem.file.name === name)
  state.uploadList.splice(index, 1)
  files.splice(filesIndex, 1)
  if (uploadConfig.value[1]?.modelv) {
    fileTree = deleteFIleTreeItem(<fileTree> fileTree, name, false)
  }
}

/** 文件上传部分 **/
const uploadButtonDisabled = ref(false)
let rootDirectoryName = null

/**
 * @function deepUpload 递归上传
 * */
const deepUpload = async (filelist: FilesItem[], rootDirectory: string) => {
  const uoloadSuccess: LocalUploadListItem[] = []
  let uploadFileList = filelist.slice(0, 5)
  //请求队列
  const request = []
  //循环添加请求函数
  for (let i = 0, len = uploadFileList.length; i < len; i++) {
    const index = state.uploadList.findIndex(fiv => fiv.name === uploadFileList[i].file.name)
    //回调函数配置
    const callbackConfig = {
      onUploadProgress: progressEvent => {
        state.uploadList[index].percentage = ((progressEvent.loaded / progressEvent.total) * 100) | 0
      },
      resolve(resData) {
        const { code, url, name, msg } = resData.data
        if (code === 200) {
          state.uploadList[index].downloadUrl = apiConfig.baseURL + url
          const { downloadUrl, name } = state.uploadList[index]
          uoloadSuccess.push({ downloadUrl, name })
        } else {
          state.uploadList[index].status = 'error'
          window.$message.error(`${ name }上传失败`)
          console.error('上传失败 服务端错误:', msg)
        }
        return resData.data
      },
      reject(error) {
        state.uploadList[index].percentage = 50
        state.uploadList[index].status = 'error'
        window.$message.error('上传失败 未知错误')
        console.error('上传失败 错误:', error)
        return error
      },
    }

    const formdata = new FormData()
    formdata.append('file', uploadFileList[i].file)
    formdata.append('path', uploadConfig.value[1]?.modelv ? `${ rootDirectory }/${ uploadFileList[i].path }` : '0')
    request.push(readyUpload(formdata, callbackConfig))
  }

  await Promise.allSettled(request)
  insertLocal(uoloadSuccess)
  uploadFileList = filelist.slice(4, filelist.length)
  if (uploadFileList.length === 0) return
  return deepUpload(uploadFileList, rootDirectory)
}

/**
 * @function uploadClick 上传按钮回调
 * */
async function uploadClick() {
  uploadButtonDisabled.value = true
  if (state.uploadList.length === 0) {
    window.$message.warning('请先选择文件')
    uploadButtonDisabled.value = false
    return
  }

  if (uploadConfig.value[1]?.modelv) {
    //文件路径 只要目录路径 文件本身不要  在筛选路径已经没有了的
    const pathList = files
        .map(mv => {
          let muPatharr = mv.path.split('/')
          muPatharr.pop()
          if (muPatharr.length === 0) return ''
          return muPatharr.join('/')
        })
        .filter(ftv => ftv !== '')
    try {
      const rest = await createDirectory({ rootName: fileTree.name as string, pathList })
      rootDirectoryName = rest.data.rootDirectoryName
    } catch (e) {
      window.$message.error('目录创建失败')
      console.error(e)
      uploadButtonDisabled.value = false
      return
    }
  }

  await deepUpload(files, rootDirectoryName)
  uploadButtonDisabled.value = false
}

function againUploadAll(id: number) {
  const item = state.uploadList.find(fv => fv.id === id)
  const findItem = files.find(filesItem => filesItem.file.name === item.name)
  deepUpload([findItem], rootDirectoryName)
}
</script>

<style lang="scss" scoped>
.upload-index {
  padding: 20px 10px 10px 10px;
  height: calc($layout-content - 30px);

  .upload-input-file {
    height: 30vh;
  }

  .ui-but {
    width: 100%;
    padding: 25px;
    margin-top: 2vh;
  }

  .ui-footer {
    width: 100%;
    margin-top: 2vh;
    //height: calc(calc($layout-content - 30px) - 30vh - 50px - 2vh - 2vh);
    //height: calc(100vh - 30vh);
    display: flex;

    .ui-footer-left {
      flex: 2;
      margin-right: 10px;
    }

    .ui-footer-right {
      flex: 3;
    }
  }
}

.file-from-view {
  padding: 5px 10px;
  margin-top: 10px;
  border-radius: var(--border-radius);
  border: 1px dashed rgb(224, 224, 230);
}
</style>
