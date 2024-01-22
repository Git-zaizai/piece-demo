<template>
    <div class="demo-view">
        <img src="./cover.png" alt="" class="cover">
        <div class="zezhao"></div>
    </div>
</template>

<script setup lang="ts">

</script>
   
   
<style lang="scss">
.demo-view {
    position: relative;
}

.cover {
    width: 100%;
    height: 550px;
}

.zezhao {
    width: 100%;
    height: 100%;
    background: #000;
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    opacity: 0.2;
}
</style>
