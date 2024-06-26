<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue'
import { MenuItem } from './outline'
import OutlineItem from './OutlineItem.vue'
import { useThemeVars } from 'naive-ui'

const props = defineProps<{
  headers: MenuItem[],
  top: number
}>()

const markerStyle = computed(() => {
  if (typeof props.top === 'number') {
    return {
      top: `${props.top}px`,
      opacity: props.top > 0 ? 1 : 0
    }
  }
  return { top: `0px`, opacity: 0 }
})

const container = ref()
const marker = ref()
const route = useRoute()
const cssVars = computed(() => {
  return {
    '--n-success-color': useThemeVars().value.successColor
  }
})
</script>

<template>
  <div class="VPDocAsideOutline" :class="{ 'has-outline': Array.isArray(headers) && headers.length > 0 }"
    :style="cssVars" ref="container" role="navigation">
    <div class="content">
      <div class="outline-marker" ref="marker" :style="markerStyle" />

      <div class="outline-title" role="heading" aria-level="2">{{ route.meta.title }}</div>

      <nav aria-labelledby="doc-outline-aria-label">
        <!-- <span class="visually-hidden" id="doc-outline-aria-label"> Table of Contents for current page </span> -->
        <OutlineItem :headers="headers" :root="true" />
      </nav>
    </div>
  </div>
</template>

<style scoped>
.VPDocAsideOutline {
  display: none;
}

.VPDocAsideOutline.has-outline {
  display: block;
}

.content {
  position: relative;
  border-left: 1px solid var(--vp-c-divider);
  padding-left: 16px;
  font-size: 13px;
  font-weight: 500;
}

.outline-marker {
  position: absolute;
  top: 32px;
  left: -1px;
  z-index: 0;
  opacity: 0;
  width: 2px;
  border-radius: 2px;
  height: 18px;
  background-color: var(--n-success-color);
  transition: top 0.25s cubic-bezier(0, 1, 0.5, 1), background-color 0.5s, opacity 0.25s;
}

.outline-title {
  line-height: 32px;
  font-size: 14px;
  font-weight: 600;
}
</style>
