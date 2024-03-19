<template>
  <div style="margin-top: 30px">

    <div class="scroll-wrapper scroll-div" ref="tabScrollRef">
      <div class="scroll-content">
        <AdminTab v-for="(item,index) in tabList"
                  class="tab-item_2"
                  button-class="tab-button"
                  chromeClass="tab-chrome"
                  :mode="TabMode"
                  :active-color="view.themeColor"
                  :active="item.cative === activeTab"
                  :closable="true"
                  :dark-mode="common.inverted"
                  @click="tabClick(item,$event)"
                  @contextmenu="handContextmenu(item,index,$event)">
          {{ item.title }}
        </AdminTab>
      </div>
    </div>
    <n-space style="margin-top: 20px">
      <n-button @click="TabMode = 'button'">
        - button 按钮风格
      </n-button>
      <n-button @click="TabMode = 'chrome'">
        - chrome 浏览器标签风格
      </n-button>
    </n-space>
  </div>
  <tab-dropdown :x="xRef" v-model:show="showDrop" :y="yRef" @down-click="downclick"/>
</template>

<script name="tsb2" setup lang="ts">
import { useViewStore } from '@/store/modules/useViewStore'
import { useCommonStore } from '@/store'
import { Ref } from 'vue'
import { useElementBounding } from '@vueuse/core'

import { AdminLayout, AdminTab } from "@soybeanjs/vue-materials"
import TabDropdown from '../components/tab-dropdown.vue'
import BetterScroll, { BScrollInstance } from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'


const view = useViewStore()
const common = useCommonStore()

let bScroll: BScrollInstance | null = null
BetterScroll.use(MouseWheel)

const tabScrollRef = ref()
const { width: bsWrapperWidth, left: bsWrapperLeft } = useElementBounding(tabScrollRef)

/**
 * @function tabLenHide 隐藏tab最后一个的分隔线 准入真值把上一个tab分隔线显示
 * */
function tabLenHide() {
  const tabLenEl = Array.from(document.querySelectorAll('.tab-item_2')).at(-1)
  const lastEl = tabLenEl.lastElementChild as HTMLElement
  lastEl.style.display = 'none'
}

onMounted(() => {
  bScroll = new BetterScroll(tabScrollRef.value, {
    scrollX: true,
    disableMouse: false,
    bounce: false,
    scrollY: false,
    mouseWheel: true,
    click: true,
    eventPassthrough: 'vertical'
  })
  tabLenHide()
})

const activeTab = ref(0)
const TabMode: Ref<'button' | 'chrome'> = ref('chrome')
const tabList: Array<{
  title: string
  cative: number
}> = reactive([])

tabList.push(...Array.from({ length: 50 }).map((v, i) => ({
  title: `tab-${ i }`,
  cative: i
})))

const showDrop = ref<boolean>(false)
const xRef = ref<number>(0)
const yRef = ref<number>(0)

function tabClick(item: { title: string, cative: number }, event) {
  activeTab.value = item.cative
  const { localName, parentElement } = event.target
  let itemLeft = 0 // 激活包裹子tab的offsetLeft
  let itemWidth = 0 // 激活包裹子tab的宽度
  if (localName === 'div') {
    const target_el = event.target.getBoundingClientRect()
    itemLeft = target_el.x
    itemWidth = event.target.offsetWidth
  } else {
    const parent = parentElement.getBoundingClientRect()
    itemLeft = parent.x
    itemWidth = parentElement.offsetWidth
  }
  // 别问怎么算的，抄的
  const deltaX = ((itemLeft + itemWidth / 2) - bsWrapperLeft.value) - bsWrapperWidth.value / 2 - 10
  const { maxScrollX, x: leftX } = bScroll
  const rightX = maxScrollX - leftX
  const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX)
  bScroll.scrollBy(update, 0, 300)
}

let tab_item = null
let tab_index = 0

function handContextmenu(item: { title: string, cative: number }, index: number, event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  tab_item = item
  tab_index = index
  nextTick().then(() => {
    xRef.value = event.clientX
    yRef.value = event.clientY
    showDrop.value = true
  })
}

function downclick(key, label) {
  window.$message.success(`点击了
  key:${ key },${ label }
  tab: ${ tab_item.title },${ tab_item.cative } tab-index:${ tab_index }`)
  showDrop.value = false
}
</script>

<style lang="scss" scoped>
.scroll-wrapper {
  position: relative;
  overflow: hidden;
  width: 100vw;
  white-space: nowrap;
}

.scroll-content {
  display: inline-block;
}

.scroll-div {
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 12px 0;
}

.tab-button {
  margin-right: 10px;
  background: #000;
}

.tab-chrome {
  margin-right: 0px;
}
</style>