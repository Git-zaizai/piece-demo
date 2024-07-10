<template>
  <div class="demo-view">
    <!-- <n-upload :default-upload="false" @change="handleUploadChange">
      <n-button>上传文件</n-button>
    </n-upload> -->
    <div class="flex-alc">
      <div class="letf">
        <div>
          <n-upload :default-upload="false" :show-file-list="false" @change="handleUploadChange">
            <n-button class="w-100">选择文件</n-button>
          </n-upload>

          开始秒：<n-input-number v-model:value="time" /> 结束秒：<n-input-number v-model:value="clocetime" />
        </div>
        <video class="video mt-20" ref="videoRef" :src="videosrc" controls></video>
      </div>
      <div class="right ml-20">
        <p>Time: {{ imgindexText }}</p>
        <canvas class="canvas mt-20" ref="canvasRef"></canvas>
      </div>
    </div>
    <div class="imglist">
      <div v-for="(item, index) in imgSrcList" :key="index">
        <p>Time: {{ item.currentTime }}</p>
        <img :src="item.dataURL" alt="" @click="imageclick(item, index)" :class="index === imgindex ? 'imgclk' : ''" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UploadFileInfo } from 'naive-ui'

const time = ref(0)
const clocetime = ref(10)

const videoRef = ref<HTMLVideoElement>()
const videosrc = ref('')

const fileListRef = ref<File>()
const canvasRef = ref<HTMLCanvasElement>()
let ctx = null

const imgSrcList = ref<any[]>([])
const imgindex = ref(0)
const imgindexText = ref('')

function handleUploadChange(data: { file: UploadFileInfo }) {
  fileListRef.value = data.file.file
  videoToCanvas(data.file.file, time.value, clocetime.value)
}

function videoToCanvas(file, time, defclocetime) {
  videoRef.value.autoplay = true
  videoRef.value.muted = true
  videoRef.value.currentTime = time
  /* if (!videosrc.value) {
    videosrc.value = URL.createObjectURL(file)
  }
  videoRef.value.oncanplay = () => {
    if (defclocetime === -1) {
      clocetime.value = videoRef.value.duration
    }
    canvasRef.value.width = videoRef.value.videoWidth
    canvasRef.value.height = videoRef.value.videoHeight
    if (!ctx) {
      ctx = canvasRef.value.getContext('2d')
    }
    let imglist = []
    for (let index = time; index < clocetime.value; index++) {
      videoRef.value.currentTime = time
      ctx.drawImage(videoRef.value, 0, 0, canvasRef.value.width, canvasRef.value.height)
      imglist.push(canvasRef.value.toDataURL('image/png'))
      console.log('🚀 ~ videoToCanvas ~ imglist:', imglist)
    }

    imgSrcList.value = imglist
  } */
  const canvas2 = document.createElement('canvas')
  const ctx2 = canvas2.getContext('2d')

  //  画第一针
  videoRef.value.oncanplay = () => {
    canvasRef.value.width = videoRef.value.videoWidth
    canvasRef.value.height = videoRef.value.videoHeight

    canvas2.width = videoRef.value.videoWidth
    canvas2.height = videoRef.value.videoHeight

    ctx = canvasRef.value.getContext('2d')
    ctx.drawImage(videoRef.value, 0, 0, canvasRef.value.width, canvasRef.value.height)
    imgSrcList.value.push({
      currentTime: videoRef.value.currentTime + '-ctx',
      dataURL: canvasRef.value.toDataURL('image/png')
    })
  }

  function videotimeupdate(e) {
    console.log('🚀 ~ videotimeupdate ~ e:', e.target.currentTime)
    if (e.target.currentTime < time + defclocetime) {
      ctx2.drawImage(e.target, 0, 0, canvasRef.value.width, canvasRef.value.height)
      const imgDataURL = canvas2.toDataURL('image/png')
      imgSrcList.value.push({
        currentTime: e.target.currentTime + '-ctx2',
        dataURL: imgDataURL
      })
    } else {
      videoRef.value.pause()
    }
  }

  videoRef.value.addEventListener('timeupdate', videotimeupdate)
  videosrc.value = URL.createObjectURL(file)
}

function imageclick(item, index) {
  imgindexText.value = item.currentTime
  imgindex.value = index
  const img = new Image()
  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvasRef.value.width, canvasRef.value.height)
  }
  img.src = item.dataURL
}
</script>

<style lang="scss" scoped>
.letf,
.right {
  width: 50%;
}

::v-deep(.n-upload-trigger) {
  width: 100%;
}

.video {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}

.canvas {
  width: 90%;
  height: 300px;
}

.imglist {
  margin-top: 100px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  img {
    width: 150px;
    height: 90px;
    margin: 2px;
  }
}

.imgclk {
  border: 2px solid #ff1111;
  margin: 0 2px;
}
</style>
