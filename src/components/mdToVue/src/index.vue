<script setup lang="ts">
import AsideOutline from './AsideOutline.vue'
import type { MenuItem, Outline } from './outline'

defineOptions({
  name: 'MdToVue'
})

const headers = shallowRef<MenuItem[]>([])
const resolvedHeaders: { element: HTMLHeadElement; link: string; title: string }[] = []
let OutlineItems: HTMLLinkElement[] = []

onMounted(() => {
  nextTick(() => {
    const headersElements = [...document.querySelectorAll('.vp-doc :where(h1,h2,h3,h4,h5,h6)')]
      .filter(el => el.id && el.hasChildNodes())
      .map(el => {
        const level = Number(el.tagName[1])

        const mp = {
          element: el as HTMLHeadElement,
          title: serializeHeader(el),
          link: '#' + el.id,
          level,
          children: []
        }
        resolvedHeaders.push({
          element: mp.element,
          link: mp.link,
          title: mp.title
        })
        return mp
      })
    headers.value = createAsideTree(headersElements)
  })
})

function createAsideTree(list: MenuItem[]): MenuItem[] {
  let res = []

  list.forEach((e, i) => {
    if (e.level === 1) {
      res.push(e)
    } else {
      for (let j = i; j >= 0; j--) {
        if (list[j].level === 1) {
          list[j].children.push(e)
          break
        }
      }
    }
  })
  return res
}

function serializeHeader(h: Element): string {
  let ret = ''
  for (const node of h.childNodes) {
    if (node.nodeType === 1) {
      if (
        (node as Element).classList.contains('VPBadge') ||
        (node as Element).classList.contains('header-anchor') ||
        (node as Element).classList.contains('ignore-header')
      ) {
        continue
      }
      ret += node.textContent
    } else if (node.nodeType === 3) {
      ret += node.textContent
    }
  }
  return ret.trim()
}

const asideTop = ref(0)
const vpviewRef = ref()

/** 利用事件冒泡阻止 router 刷新 */
function bindLinkClk(event) {
  if (event.target.tagName === 'A') {
    event.preventDefault()
    console.log(event.target.href)
    const { pathname } = window.location
    if (/^https?:\/\//.test(event.target.href) && !event.target.href.includes(pathname)) {
      return window.open(event.target.href)
    }
    const id = event.target.href.split('#')[1]
    const heading = document.getElementById(decodeURIComponent(id))
    vpviewRef.value.scrollTo({ top: heading.offsetTop + 30, behavior: 'smooth' })
  }
}

function vpViewOnScroll() {
  let scrolltop = 0
  if (vpviewRef.value.scrollTop > vpviewRef.value.offsetHeight) {
    scrolltop = vpviewRef.value.scrollTop + 30
  } else {
    scrolltop = vpviewRef.value.scrollTop + 30
  }

  function updateDemo() {
    if (OutlineItems.length === 0) {
      OutlineItems = [...document.querySelectorAll('.VPDocOutlineItem li a')] as HTMLLinkElement[]
    }

    OutlineItems.forEach(link => {
      if (link.classList.contains('active')) {
        link.classList.remove('active')
      }
    })

    let offsetTopindex = 0
    if (scrolltop >= resolvedHeaders.at(-1).element.offsetTop) {
      offsetTopindex = resolvedHeaders.length - 1
    } else {
      for (let i = 0; i < resolvedHeaders.length; i++) {
        const { element } = resolvedHeaders[i]
        if (scrolltop < element.offsetTop) {
          offsetTopindex = i - 1
          break
        }
      }
    }

    OutlineItems[offsetTopindex].classList.add('active')
    asideTop.value = OutlineItems[offsetTopindex].offsetTop + 39
  }

  requestAnimationFrame(updateDemo)
}
</script>

<template>
  <div class="vp-view" ref="vpviewRef" @click="bindLinkClk" @scroll="vpViewOnScroll">
    <div class="content">
      <slot></slot>
    </div>
    <div class="aside">
      <div class="aside-container">
        <div class="aside-content">
          <AsideOutline :headers="headers" :top="asideTop" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vp-view {
  padding: 48px 32px 0;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  overflow-y: auto;
  max-height: calc(100vh - 65px);
}

@media (min-width: 960px) {
  .content {
    order: 1;
    margin: 0;
    min-width: 640px;
    padding: 0 32px 128px;
  }
}

@media (min-width: 1280px) {
  .vp-view .aside {
    display: block;
  }
}

.aside {
  position: relative;
  display: none;
  order: 2;
  flex-grow: 1;
  padding-left: 32px;
  width: 100%;
  max-width: 256px;
}

.aside-container {
  position: fixed;
  top: 15vh;
  width: 224px;
  height: calc(100% - 15vh);
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
}

.aside-content {
  display: flex;
  flex-direction: column;
  min-height: calc(100% - (var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px));
  padding-bottom: 32px;
}

.content {
  position: relative;
  margin: 0 auto;
  width: 100%;
  order: 1;
  margin: 0;
  min-width: 640px;
}
</style>
