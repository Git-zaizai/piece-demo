<template>
  <div class="view-height_100">
    <tab-css-scroll></tab-css-scroll>
    <drop-down/>
    <tab-er/>
  </div>
</template>

<script setup lang="ts">
import TabCssScroll from './tab1/tab-css-scroll.vue'
import DropDown from './components/dropdown.vue'
import TabEr from './tab2/index.vue'
</script>

<style lang="scss" scoped>
.view-height_100 {
  flex-direction: column;
}
</style>