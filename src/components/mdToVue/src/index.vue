<script setup lang="ts">
import AsideOutline from './AsideOutline.vue'
import type { MenuItem, Outline } from './outline'

const headers = shallowRef<MenuItem[]>([])
const resolvedHeaders: { element: HTMLHeadElement; link: string; title: string }[] = []

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
      for (let j = i; j > 0; j--) {
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

const vpviewRef = ref()
function bindLinkClk(event) {
  if (event.target.tagName === 'A') {
    event.preventDefault()
    const find = resolvedHeaders.find(fv => fv.title === event.target.textContent)
    function scrollToTarget() {
      vpviewRef.value.scrollTo({ top: find.element.offsetTop, behavior: 'smooth' })
    }
    requestAnimationFrame(scrollToTarget)
  }
}

// @ts-ignore
onBeforeRouteUpdate(to => {
  const find = headers.value.find(fv => fv.link === to.hash)
  if (find) {
    return {
      el: to.hash,
      behavior: 'smooth'
    }
  }
  return null
})
</script>

<template>
  <div class="vp-view" @click="bindLinkClk" ref="vpviewRef">
    <div class="content">
      <slot></slot>
    </div>
    <div class="aside">
      <div class="aside-container">
        <div class="aside-content">
          <AsideOutline :headers="headers" />
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
  overflow-y: scroll;
  height: calc(100vh - 75px);
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
