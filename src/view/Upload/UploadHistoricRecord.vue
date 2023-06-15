<template>
  <div class="upload-historic-record">
    <div class="ul-title flex-alc-juc">
      <n-tooltip trigger="hover">
        <template #trigger>
          <span class="view-curspointer text-user-select" @click="refreshState">历史记录</span>
        </template>
        点击刷新列表
      </n-tooltip>
      <n-icon
          class="search-icon"
          size="24"
          :component="SearchCircleOutline"
          @click="searchClick"
          v-show="!isSearch"
      />
      <n-input-group class="ul-input" v-show="isSearch">
        <n-input ref="inputInstRef" :style="{ width: '80%',height:'34px' }" @input="debounceInput"/>
        <n-button type="primary" ghost @click="closeClick">
          <n-icon size="18" :component="Close"/>
        </n-button>
      </n-input-group>
    </div>

    <div class="ul-list-view">
      <n-scrollbar>
        <div class="ul-item flex-alc" v-for="item in state.allList" :key="item.name">
          <n-icon :size="34" :component="item.isImg ? FileImageOutlined : FileTextOutlined"></n-icon>
          <p class="ul-item-name text-dwoe">{{ item.name }}</p>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button text class="cent-but" @click="codeDownloadUrl(item.downloadUrl)">
                <template #icon>
                  <n-icon size="18" :component="LinkSquare16Regular"/>
                </template>
              </n-button>
            </template>
            复制链接
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button text class="cent-but" :disabled="!item.isImg" @click="preViewClick(item.name)">
                <template #icon>
                  <n-icon size="18" :component="EyeOutline"/>
                </template>
              </n-button>
            </template>
            查看图片
          </n-tooltip>
        </div>
      </n-scrollbar>
    </div>
    <div class="ul-img" style="display: none">
      <n-image-group show-toolbar-tooltip>
        <n-space>
          <n-image
              v-for="(imageItem,index) in state.images"
              :key="imageItem.name"
              :src="imageItem.downloadUrl"
              @error="imageErr(imageItem)"
              ref="imageRef"
              width="100"
          />
        </n-space>
      </n-image-group>
    </div>
  </div>
</template>

<script name="UploadHistoricRecord" lang="ts" setup>
import { EyeOutline, SearchCircleOutline, Close } from '@vicons/ionicons5'
import { FileImageOutlined, FileTextOutlined } from '@vicons/antd'
import { LinkSquare16Regular } from '@vicons/fluent'
import { initGetLoaclUploadList } from './init'
import { InputInst } from 'naive-ui'
import { getLocalTheLatest } from './utils'
import { debounce } from '@/utils'

let state = initGetLoaclUploadList()
const isSearch = ref(false)
const inputInstRef = ref<InputInst | null>(null)


async function searchClick() {
  isSearch.value = !isSearch.value
  await nextTick()
  inputInstRef.value?.focus()
}

function closeClick() {
  isSearch.value = !isSearch.value
  const { allList, images } = initGetLoaclUploadList()
  state.allList = allList
  state.images = images
}

function refreshState() {
  const { allList, images } = getLocalTheLatest(state.allList.length)
  console.log(allList.length)
  if (!allList.length) return
  state.allList.unshift(...allList)
  state.images.unshift(...images)
}

const debounceInput = debounce(inputChange, 700)

function inputChange(value: string) {
  const reg = new RegExp(value, 'i')
  const list = []
  const imglist = []
  const { allList } = state
  for (let i = 0, len = allList.length; i < len; i++) {
    if (reg.test(allList[i].name)) {
      list.push(allList[i])
      if (allList[i].isImg) {
        imglist.push(allList[i])
      }
    }
  }
  state.allList = list
  state.images = imglist
}

function imageErr(item) {
  item.downloadUrl = 'src/assets/img/404.jpg'
}

/**
 * @function codeDownloadUrl 复制链接
 * */
function codeDownloadUrl(downloadUrl: string) {
  navigator.clipboard.writeText(downloadUrl).then(() => {
    window.$message.success('复制成功')
  }, (e) => {
    window.$message.error('复制失败')
    console.log('复制链接失败 错误：', e)
  })
}

/** 查看图片 **/
const imageRef = ref<HTMLElement | null>(null)

function preViewClick(name: string) {
  const fileListItemIndex = state.images.findIndex(vi => vi.name === name)
  imageRef.value[fileListItemIndex].click()
}
</script>

<style lang="scss" scoped>
$border-dashed: 1px dashed rgb(224, 224, 230);

.upload-historic-record {
  background-color: var(--n-color);
  border-radius: var(--border-radius);

  .ul-title {
    position: relative;
    color: var(--table-text);
    display: flex;
    height: 50px;
    font-weight: 700;
    font-family: "幼圆";
    text-align: center;
    border-top: $border-dashed;
    border-left: $border-dashed;
    border-right: $border-dashed;
    border-top-right-radius: var(--border-radius);
    border-top-left-radius: var(--border-radius);

    span {
      width: 240px;
    }

    .ul-input {
      flex: 2.8;
    }
  }

  .search-icon {
    position: absolute;
    right: 20px;
    top: 13px;
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
    transition: all .3s linear;

    .ul-item-name {
      flex: 1;
      margin-left: 10px;
      line-height: 50px;
      color: var(--table-text);
      font-weight: 700;
      font-family: "幼圆";
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
