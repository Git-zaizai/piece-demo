<template>
  <div>
    <div class="layout">
      <div v-for="(item, index) in components" :key="index">
        <component :is="item.default"></component>
      </div>
    </div>
  </div>
</template>
<script setup>
const components = import.meta.glob('./components/*.vue', { eager: true })
</script>
<style scoped>
.layout {
  display: flex;
  flex-direction: column;
}
</style>
