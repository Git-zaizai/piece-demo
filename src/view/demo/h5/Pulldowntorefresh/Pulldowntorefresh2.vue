<template>
  <div class="zai-pull">
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.zai-pull {
  height: 100%;
  overflow-y: scroll;
}
</style>
