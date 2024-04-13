<script setup lang="ts">
import type { MenuItem } from './outline'

defineOptions({
  name: 'OutlineItem'
})

defineProps<{
  headers: MenuItem[]
  root?: boolean
}>()

let vpviewDom = null

function onClick({ target: el }: Event) {
  if (!vpviewDom) {
    vpviewDom = document.querySelector('.vp-view')
  }
  const id = (el as HTMLAnchorElement).href!.split('#')[1]
  const heading = document.getElementById(decodeURIComponent(id))
  heading?.focus({ preventScroll: true })
  function scrollToTarget() {
    const top = heading.offsetTop + 30
    vpviewDom.scrollTo({ top, behavior: 'smooth' })
  }
  // requestAnimationFrame(scrollToTarget)
}
</script>

<template>
  <ul class="VPDocOutlineItem" :class="root ? 'root' : 'nested'">
    <li v-for="{ children, link, title } in headers">
      <a class="outline-link" :href="link" @click="onClick" :title="title">{{ title }}</a>
      <template v-if="children?.length">
        <OutlineItem :headers="children" />
      </template>
    </li>
  </ul>
</template>

<style scoped>
.root {
  position: relative;
  z-index: 1;
}

.nested {
  padding-right: 16px;
  padding-left: 16px;
}

.outline-link {
  display: block;
  line-height: 32px;
  font-size: 14px;
  font-weight: 400;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.5s;
}

.outline-link:hover,
.outline-link.active {
  color: var(--n-success-color);
  transition: color 0.25s;
}

.outline-link.nested {
  padding-left: 13px;
}
</style>
