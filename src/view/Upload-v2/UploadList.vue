<template>
  <div class="upload-list">
    <div class="ul-title">上传列表</div>
    <div class="ul-list-view">
      <n-scrollbar>
        <div class="ul-item flex-alc" v-for="item in props.fileList" :key="item.id">
          <n-icon :size="34" :component="item.imgUrl === '' ? FileTextOutlined : FileImageOutlined"></n-icon>
          <p class="ul-item-name text-dwoe">{{ item.name }}</p>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button
                text
                class="cent-but"
                :disabled="item.downloadUrl === ''"
                @click="codeDownloadUrl(item.downloadUrl)"
              >
                <template #icon>
                  <n-icon size="18" :component="LinkSquare16Regular" />
                </template>
              </n-button>
            </template>
            复制链接
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button text class="cent-but" :disabled="item.imgUrl === ''" @click="preViewClick(item.id)">
                <template #icon>
                  <n-icon size="18" :component="EyeOutline" />
                </template>
              </n-button>
            </template>
            查看图片
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button
                text
                class="cent-but"
                :disabled="item.status === 'success'"
                @click="emit('againUpload', item.id)"
              >
                <template #icon>
                  <n-icon size="16" :component="ArrowClockwise20Filled" />
                </template>
              </n-button>
            </template>
            再次上传
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button text @click="emit('delFile', item.id)">
                <template #icon>
                  <n-icon size="16" :component="DeleteDismiss24Regular" />
                </template>
              </n-button>
            </template>
            删除
          </n-tooltip>

          <n-progress
            class="ul-item-progress"
            type="line"
            :status="item.status"
            :percentage="item.percentage"
            :height="1"
            :show-indicator="false"
          />
        </div>
      </n-scrollbar>
    </div>
    <div class="ul-img" style="display: none">
      <n-image-group show-toolbar-tooltip>
        <n-space>
          <n-image v-for="imageItem in imageList" :key="imageItem.id" :src="imageItem.url" ref="imageRef" width="100" />
        </n-space>
      </n-image-group>
    </div>
  </div>
</template>

<script name="UploadList" lang="ts" setup>
import { EyeOutline } from '@vicons/ionicons5'
import { LinkSquare16Regular, ArrowClockwise20Filled, DeleteDismiss24Regular } from '@vicons/fluent'
import { FileImageOutlined, FileTextOutlined } from '@vicons/antd'
import type { uploadFileListItem } from './types'

const props = defineProps<{
  fileList?: uploadFileListItem[]
  isImgClk: boolean
}>()
const emit = defineEmits<{
  (e: 'againUpload', id: number): void
  (e: 'delFile', id: number): void
}>()

const imageList = computed(() => {
  return props.fileList
    .filter(fv => fv.imgUrl !== '')
    .map(mv => {
      if (mv.imgUrl !== '') return { id: mv.id, url: mv.imgUrl }
    })
})

/** 查看图片 **/
const imageRef = ref<HTMLElement | null>(null)

function preViewClick(id: number) {
  if (props.isImgClk) return
  const fileListItemIndex = imageList.value.findIndex(vi => vi.id === id)
  imageRef.value[fileListItemIndex].click()
}

/**
 * @function codeDownloadUrl 复制链接
 * */
function codeDownloadUrl(downloadUrl: string) {
  console.log('asdasdasdasdasd')

  const clipboard = navigator.clipboard
  console.log('clipboard', clipboard)

  if (clipboard) {
    clipboard.writeText(downloadUrl).then(
      () => {
        window.$message.success('复制成功')
      },
      e => {
        window.$message.error('复制失败')
        console.log('复制链接失败 错误：', e)
      }
    )
  } else {
    const textarea = document.createElement('textarea')
    textarea.setAttribute('readonly', 'readonly')
    textarea.value = downloadUrl
    document.body.appendChild(textarea)
    textarea.select()
    const exec = document.execCommand('copy')
    console.log('exec', exec)

    if (exec) {
      document.execCommand('copy')
      window.$message.success('复制成功')
    } else {
      window.$message.error('复制失败')
    }
    document.body.removeChild(textarea)
  }
}

/** 未使用 **/
const ulTitleBoxshadow = ref('')

function uLscroll(e: Event) {
  const target = e.target as HTMLElement
  if (target.scrollTop > 0) {
    ulTitleBoxshadow.value = 'box-shadow: 0px 2px 3px 1px rgb(224 224 230);'
  } else {
    ulTitleBoxshadow.value = ''
  }
}
</script>

<style lang="scss" scoped>
$border-dashed: 1px dashed rgb(224, 224, 230);

.upload-list {
  position: relative;
  background-color: var(--n-color);
  border-radius: var(--border-radius);

  .ul-title {
    position: relative;
    line-height: 50px;
    color: var(--table-text);
    font-weight: 700;
    font-family: '幼圆';
    text-align: center;
    border-top: $border-dashed;
    border-left: $border-dashed;
    border-right: $border-dashed;
    border-top-right-radius: var(--border-radius);
    border-top-left-radius: var(--border-radius);
  }

  .ul-box-show::after {
    position: absolute;
    content: ' ';
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.5);
    filter: blur(10px);
    opacity: 0.4;
    transform-origin: 0 0;
    border-radius: inherit;
    transform: scale(1, 1);
  }

  .ul-list-view {
    border: $border-dashed;
    height: 41vh;
    padding-bottom: 1px;
  }

  .ul-item {
    position: relative;
    padding: 0 20px;
    transition: all 0.3s linear;

    .ul-item-name {
      flex: 1;
      margin-left: 10px;
      line-height: 50px;
      color: var(--table-text);
      font-weight: 700;
      font-family: '幼圆';
      width: 40%;
    }

    .cent-but {
      margin-right: 15px;
    }

    .ul-item-progress {
      position: absolute;
      bottom: 0px;
      left: 0;
    }
  }

  .ul-item:hover {
    background-color: var(--hover-color);
  }
}
</style>
