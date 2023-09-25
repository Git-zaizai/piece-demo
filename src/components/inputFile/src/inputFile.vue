<template>
  <label :style="fileStyles">
    <input
        id="file_webky"
        ref="inputFileRef"
        type="file"
        :multiple="multiple"
        :accept="accept"
        :webkitdirectory="webkitdirectory"
        @change="inputFileChange"
    />
    <div
        class="file-div view-curspointer flex-fdc-alc-juc"
        @drop.prevent="fileDivOndrop"
        @dragover.prevent="() => false"
    >
      <n-icon size="100" color="var(--text-Color)" :component="ArchiveOutline"></n-icon>
      <h2 class="file-text">点击或者拖动文件到该区域来上传</h2>
      <h4 class="file-text">{{ title }}</h4>
    </div>
  </label>
</template>

<script lang="ts">
import { ArchiveOutline } from '@vicons/ionicons5'
import { useThemeVars } from 'naive-ui'
import useGetFilesDrop, { createFileTree } from './utlis'

export default defineComponent({
  name: 'inputFile',
  components: {
    ArchiveOutline,
  },
  props: {
    webkitdirectory: {
      // 是否开启了上传文件夹
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码'
    },
    accept: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  emits: ['FileChange'],
  setup(props, { emit }) {
    const fileStyles = computed(() => {
      const themeVars = useThemeVars()
      return {
        '--n-color': themeVars.value.actionColor,
        '--text-Color': themeVars.value.textColor3,
        '--border-radius': themeVars.value.borderRadius,
        '--primary-color-hover': themeVars.value.primaryColorHover,
      }
    })

    const inputFileRef = ref<HTMLInputElement | null>()

    /*
     * js drop事件监听获取files值 在浏览器打印显示length为0的问题
     * 该问题应该是浏览器bug，直接通过e.dataTransfer.files获取即可
     * */
    async function fileDivOndrop(e: DragEvent) {
      try {
        const items = e.dataTransfer?.items
        const result = await useGetFilesDrop(items)
        emit('FileChange', result)
      } catch (e) {
        console.log('文件拖拽上传错误：', e)
        window.$notification.error({
          content: e.toString(),
          title: '错误：',
          duration: 2500,
          keepAliveOnHover: true,
        })
      }
    }

    /**
     * 点击选择文件是 开启了上传文件夹才构建文件树
     * */
    function inputFileChange(e) {
      let files: File[] = Array.from(e.target.files)
      const tree = props.webkitdirectory ? createFileTree(files) : {}
      emit('FileChange', {
        filesArray: files.map(item => ({ file: item, path: item.webkitRelativePath })),
        DirectoryTree: tree,
      })
      inputFileRef.value.value = null
    }

    return {
      ArchiveOutline,
      fileStyles,
      fileDivOndrop,
      inputFileChange,
      inputFileRef,
    }
  },
})
</script>

<style lang="scss" scoped>
#file_webky,
#file {
  display: none;
}

.file-div {
  height: calc(100% - 50px);
  border: 1px dashed rgb(224, 224, 230);
  padding: 25px;
  background-color: var(--n-color);
  border-radius: var(--border-radius);
}

.file-div:hover {
  border-color: var(--primary-color-hover);
}

.file-text {
  color: var(--text-Color);
}
</style>
