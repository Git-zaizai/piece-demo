<script setup lang="ts">
function getRandomColor() {
  // 生成随机 RGB 颜色分量
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  // 将 RGB 分量转换为十六进制颜色值
  const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
    .toString(16)
    .padStart(2, '0')}`

  return hexColor
}
const els = ref(
  new Array(9).fill(1).map((_, index) => {
    return {
      value: index,
      color: getRandomColor(),
      x: 0,
      y: 0
    }
  })
)

let items = []

let isMousemove = true
let start = null
let startitem = null

onMounted(() => {
  document.querySelectorAll('.item').forEach((item, i) => {
    const itemClient = item.getBoundingClientRect()
    items.push(itemClient)
  })
  console.log('🚀 ~ items:', items)
})

function mousedown(item, index: number, event: MouseEvent) {
  const { pageX, pageY } = event
  start = { pageX, pageY, index }
  console.log('🚀 ~ mousedown ~ start:', start)
  isMousemove = false
  startitem = item
  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', mouseup)
}
let time
function mousemove(event: MouseEvent) {
  event.preventDefault()
  if (isMousemove) return
  const is = items[start.index]

  els.value[start.index].x = startitem.x + (event.pageX - start.pageX)
  els.value[start.index].y = startitem.y + (event.pageY - start.pageY)

  if (time) {
    clearTimeout(time)
  }
  time = setTimeout(() => {
    console.log('🚀 ~ mousemove ~ event:', event)
    console.log('🚀 ~ mousemove ~  els.value[start.index]:', start, els.value[start.index])
    console.log('🚀 ~ mousemove ~ event.pageX - start.pageX:', event.pageX - start.pageX)
  }, 100)
}
function mouseup(event) {
  console.log('🚀 ~ mouseup ~ mouseup:')
  setTimeout(() => {
    start = null
    startitem = null
    isMousemove = true
  }, 150)
}

function isColliding(element1, element2) {
  // 获取两个元素的位置信息

  // 判断两个元素是否相交或重叠
  // 如果其中一个元素的底部小于另一个元素的顶部，或者其中一个元素的顶部大于另一个元素的底部，则两个元素不相交
  // 如果其中一个元素的右侧小于另一个元素的左侧，或者其中一个元素的左侧大于另一个元素的右侧，则两个元素不相交
  // 通过这四个条件取反得到是否相交的结果
  return !(
    element1.bottom < element2.top ||
    element1.top > element2.bottom ||
    element1.right < element2.left ||
    element1.left > element2.right
  )
}
</script>

<template>
  <div>
    <div class="view">
      <div
        class="item"
        v-for="(item, index) in els"
        :style="{ backgroundColor: item.color, transform: `translate(${item.x}px,${item.y}px)` }"
        @mousedown="mousedown(item, index, $event)">
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.view {
  width: 400px;
  height: 400px;
  background-color: aquamarine;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  padding: 10px;

  .item {
    width: calc(400px / 3 - 10px);
    height: calc(400px / 3 - 10px);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
}
</style>
