<template>
  <hover-button>
    <n-el class="flex-fdc-alc-juc">
      <div class="file-form-item flex-juspb-alc" v-for="(item,index) in uploadConfig" :key="index">

        <n-icon
            size="20"
            color="var(--text-color-3)"
            class="file-form-item-header"
            :component="EmojiSparkle32Regular"
        />

        <p class="file-form-item-p"> {{ item.label }}</p>
        <n-popconfirm
            @positive-click="handlePositiveClick"
            @negative-click="handleNegativeClick"
            negative-text="不删"
            positive-text="删了"
            trigger="manual"
            :show="item.popConFirmShow"
            v-if="item.isPopconfirm"
        >
          <template #trigger>
            <n-switch
                v-model:value="item.modelv"
                :rail-style="fileSwitchConfig.railStyle"
                :loading="fileSwitchConfig.loading"
                @update:value="item.OnUpdateValue"
            >
              <template #checked-icon>
                <n-icon size="20" :color="fileSwitchConfig.checkediconColor" :component="FaceWink"/>
              </template>
              <template #unchecked-icon>
                <n-icon size="18" :color="fileSwitchConfig.uncheckediconColoer" :component="FaceDizzy"/>
              </template>
            </n-switch>
          </template>
          你确定要取消保存吗？
        </n-popconfirm>

        <n-switch
            v-model:value="item.modelv"
            :rail-style="fileSwitchConfig.railStyle"
            :loading="fileSwitchConfig.loading"
            @update:value="item.OnUpdateValue"
            v-else
        >
          <template #checked-icon>
            <n-icon size="20" :color="fileSwitchConfig.checkediconColor" :component="FaceWink"/>
          </template>
          <template #unchecked-icon>
            <n-icon size="18" :color="fileSwitchConfig.uncheckediconColoer" :component="FaceDizzy"/>
          </template>
        </n-switch>

      </div>
    </n-el>
  </hover-button>
</template>

<script name="UploadConfig" lang="ts" setup>
import HoverButton from '@/components/hover-button.vue'
import { EmojiSparkle32Regular } from '@vicons/fluent'
import { FaceDizzy, FaceWink } from '@vicons/carbon'
import { CSSProperties } from 'vue'
import Storage from '@/utils/Storage'
import type { localUploadConfigItem } from './types'
import { initMergeUploadConfig } from './init'
import { useFileIndexStore } from '@/store/modules/useFileIndexStore'


const fileIndexStore = useFileIndexStore()

const emit = defineEmits<{
  (e: 'updateUploadConfig', value: localUploadConfigItem[]): void
}>()

const fileSwitchConfig = {
  checkedIconColor: 'rgb(255 200 61)',
  uncheckedIconColor: 'rgb(118, 124, 130)',
  railStyle: ({ focused, checked }: { focused: boolean, checked: boolean }) => {
    const style: CSSProperties = {}
    if (checked) {
      style.background = 'rgb(255 200 61)'
      if (focused) {
        style.boxShadow = '0 0 0 2px rgb(255 234 180)'
      }
    } else {
      style.background = 'var(--n-rail-color)'
      if (focused) {
        style.boxShadow = 'var(--n-button-box-shadow)'
      }
    }
    return style
  },
  loading: false,
}

const uploadConfig = initMergeUploadConfig([
  {
    id: 0,
    label: '目录上传',
    modelv: false,
    isPopconfirm: false,
    tooltiptxt: '选择文件的时候只能选择文件夹（在文件选框中只能选择目录），不能选文件，不包含空文件夹',
    OnUpdateValue: switchValueWatch
  },
  {
    id: 1,
    label: '上传目录保持一致',
    modelv: false,
    isPopconfirm: false,
    tooltiptxt: '文件夹的目录是啥样的，上传到服务器也是一样的目录，不包含空文件夹',
    OnUpdateValue: switchValueWatch
  },
  {
    id: 2,
    label: '不查看列表图片',
    modelv: false,
    isPopconfirm: false,
    tooltiptxt: '在文件列表中可以查看图片（只是暂时性的观看）',
    OnUpdateValue: switchValueWatch
  },
  {
    id: 3,
    label: '保存设置在本地',
    modelv: false,
    isPopconfirm: true,
    popConFirmShow: false,
    tooltiptxt: '保存你习惯的设置，也可以取消的哦，要修改的话就先取消（删除）后在重新保存',
    OnUpdateValue: delLocalFileFileConfig
  }
])

/**
 * @function switchValueWatch
 * */
function switchValueWatch(_: boolean) {
  const local = Storage.get(fileIndexStore.LoaclUploadConfigName)
  const data = uploadConfig.value.map(item => ({ id: item.id, modelv: item.modelv }))
  if (local) {
    Storage.set('uploadConfig', data)
  }
  emit('updateUploadConfig', data)
}

/**
 * @function delLocalFileFileConfig 开启保存在浏览器本地
 * */
function delLocalFileFileConfig(value: boolean) {
  if (value) {
    const data = uploadConfig.value.map(item => ({ id: item.id, modelv: item.modelv }))
    Storage.set('uploadConfig', data)
  } else {
    uploadConfig.value.at(-1).popConFirmShow = true
  }
}

/**
 * @function handlePositiveClick 确定删除设置本地配置
 * */
function handlePositiveClick() {
  Storage.remove('uploadConfig')
  window.$message.success('删除成功！')
  uploadConfig.value.at(-1).modelv = false
  uploadConfig.value.at(-1).popConFirmShow = false
}

/**
 * @function handleNegativeClick 取消
 * */
function handleNegativeClick() {
  uploadConfig.value.at(-1).popConFirmShow = false
  uploadConfig.value.at(-1).modelv = true
}
</script>

<style lang="scss" scoped>

.file-form-item {
  position: relative;
  width: 95%;
  margin: 8px 0px;
  border-radius: 18px;
  padding: 8px 15px 8px 8px;
  background-color: var(--action-color);

  .file-form-item-header {
    width: 30px;
    margin-right: 5px;
  }

  .file-form-item-p {
    position: relative;
    margin-right: 10px;
    color: var(--text-color-3);
    font-size: 14px;
    font-family: 幼圆;
    font-weight: 700;
    flex: 1;
  }

  .file-form-item-p:hover {
    color: var(--primary-color);
  }
}
</style>
