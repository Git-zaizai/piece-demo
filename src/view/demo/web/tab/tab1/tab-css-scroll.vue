<template>
  <div class="tab-div">

    <div ref="tabScrollRef"
         class="scroll-div tab-scroll"
         style="margin-top: 20px"
         @wheel="onwheel"
         :style="{'padding-left': tabPadding + dan_wei,'padding-right': tabPadding + dan_wei}">
      <AdminTab v-for="(item,index) in tabList"
                class="tab-item_1"
                button-class="tab-button"
                chromeClass="tab-chrome"
                :mode="TabMode"
                :active-color="view.themeColor"
                :active="item.cative === activeTab"
                :closable="true"
                :dark-mode="common.inverted"
                @contextmenu="handContextmenu($event,item,index)"
                @click="tabClick(item,$event)"
                @close="tabClose(item,index)">
        {{ item.title }}
      </AdminTab>
    </div>

    <n-space style="margin-top: 20px">
      <n-button @click="TabMode = 'button'">
        - button 按钮风格
      </n-button>
      <n-button @click="TabMode = 'chrome'">
        - chrome 浏览器标签风格
      </n-button>
      <n-button @click="addTab">
        添加并选中
      </n-button>
      <n-input-group>
        <n-input-group-label>tab的padding:0</n-input-group-label>
        <n-input-number style="width:100px;" v-model:value="tabPadding" clearable/>
        <n-select style="width: 70px" v-model:value="dan_wei" :options="options"/>
      </n-input-group>
    </n-space>
  </div>
  <div style="position: fixed" class="flex-alc-juc">
    <div style="width: 1px;height: 5vh;background: #001a10"></div>
  </div>
  <TabDropdown ref="tabDropdownRef" v-model:show="showDropdown" :x="xRef" :y="yRef" @down-click="downclick"/>
</template>

<script name="tab-index" setup lang="ts">
import { AdminLayout, AdminTab } from "@soybeanjs/vue-materials"
import "@soybeanjs/vue-materials/dist/style.css"
import { useViewStore } from '@/store/modules/useViewStore'
import { useCommonStore } from '@/store'
import { Ref } from 'vue'
import TabDropdown from '../components/tab-dropdown.vue'

const view = useViewStore()
const common = useCommonStore()
const tabScrollRef = ref()

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


const tabPadding = ref(5)
const options = [{ label: 'vw', value: 'vw' }, { label: 'px', value: 'px' }, { label: 'rem', value: 'rem' },
  { label: 'em', value: 'em' },]
const dan_wei = ref<string>('vw')


const showDropdown = ref<boolean>(false)
const xRef = ref<number>(0)
const yRef = ref<number>(0)
const tabDropdownRef = ref()

onMounted(() => {
  // nextTick(() => {tabLenHide()})
  tabLenHide(false)
})

/**
 * scrollBy()会在原来的地方加上你新设置的地方
 * 比如：滚动条到了 120 的地方 然后你要滚动到 850
 * 它会120 + 850 = 970 的地方，而你是想到850
 * scrollTo()是输入滚动到哪就是到哪 850 就到 850
 *
 * */
function tabClick(item: { title: string, cative: number }, event) {
  activeTab.value = item.cative
  const { localName, parentElement } = event.target
  let itemLeft = 0 // 激活包裹子tab的offsetLeft
  let itemWidth = 0 // 包裹子tab项的宽度
  if (localName === 'div') {
    itemLeft = event.target.offsetLeft
    itemWidth = event.target.offsetWidth
  } else {
    itemLeft = parentElement.offsetLeft
    itemWidth = parentElement.offsetWidth
  }
  let screenWidth = tabScrollRef.value.clientWidth
  tabScrollRef.value.scrollTo({ left: itemLeft - screenWidth / 2 + itemWidth / 2, behavior: "smooth" })
  console.log('滚动条位置', tabScrollRef.value.scrollLeft)
}

function tabClose(item: { title: string, cative: number }, index: number) {
  if (activeTab.value === item.cative) {
    activeTab.value = index + 1 > tabList.length - 1 ? tabList[index - 1].cative : tabList[index + 1].cative
  }
  tabList.splice(index, 1)
}

/**
 * @function onwheel 鼠标滚轮滚动
 * */
function onwheel(event) {
  event.preventDefault()
  tabScrollRef.value.scrollBy({ left: event.deltaY as number })
}

/**
 * @function tabLenHide 隐藏tab最后一个的分隔线 准入真值把上一个tab分隔线显示
 * */
function tabLenHide(ispre?: boolean) {
  const tabs = document.querySelectorAll('.tab-item_1')
  const tabLenEl = tabs[tabs.length - 1]
  const lastEl = tabLenEl.lastElementChild as HTMLElement
  lastEl.style.display = 'none'
  if (ispre) {
    const len_1 = tabs[tabs.length - 2]
    const lastEl_1 = len_1.lastElementChild as HTMLElement
    lastEl_1.style.display = ''
  }
}

function addTab() {
  const index = tabList.length + 1
  tabList.push({
    title: `tab-${ index }`,
    cative: index
  })
  activeTab.value = index
  nextTick(() => {
    tabScrollRef.value.scrollBy({ left: tabScrollRef.value.scrollWidth })
    tabLenHide(true)
  })
}

let tab_item = null
let tab_index = 0

function handContextmenu(e: MouseEvent, item: { title: string, cative: number }, index: number) {
  e.preventDefault()
  tab_item = item
  tab_index = index
  nextTick().then(() => {
    xRef.value = e.clientX
    yRef.value = e.clientY
    showDropdown.value = true
  })
}

function downclick(key, label) {
  window.$message.success(`点击了
  key:${ key },${ label }
  tab: ${ tab_item.title },${ tab_item.cative } tab-index:${ tab_index }`)
  showDropdown.value = false
}
</script>

<style lang="scss" scoped>
.tab-button {
  margin-right: 10px;
  background: #000;
}

.tab-chrome {
  margin-right: 0px;
}

.tab-div {
  width: 100vw;
  //background: #fff;
}

.scroll-div {
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
}

.tab-scroll {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 12px 0 4px 0;
  transition: all 0.5s linear;
}

.tab-scroll::-webkit-scrollbar {
  width: 5px;
  height: 7px;
  //display: none;
}

.tab-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  transition: all .2s ease-in-out;
}

.tab-scroll::-webkit-scrollbar-track {
  border-radius: 10px;
}

.tab-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.4);
  opacity: 0.5;
}
</style>