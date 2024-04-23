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

let elements = []
let isMousemove = true
let start = null
let startitem = null

onMounted(() => {
  document.querySelectorAll('.item').forEach((item, i) => {
    const itemClient = item.getBoundingClientRect()
    elements.push(itemClient)
  })
})

function mousedown(item, index: number, event: MouseEvent) {
  const { pageX, pageY } = event
  start = { pageX, pageY, index }
  isMousemove = false
  startitem = {
    x: item.x,
    y: item.y
  }
  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', mouseup)
}
let time
function mousemove(event: MouseEvent) {
  event.preventDefault()
  if (isMousemove) return
  els.value[start.index].x = startitem.x + (event.pageX - start.pageX)
  els.value[start.index].y = startitem.y + (event.pageY - start.pageY)

  for (let i = 0; i < els.value.length; i++) {
    const item = els.value[i]
    const element = elements[i]
  }
}

function mouseup(event) {
  setTimeout(() => {
    start = null
    startitem = null
    isMousemove = true
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
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
