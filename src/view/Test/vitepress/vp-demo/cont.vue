<template>
    <div>当前计数为：{{ count }} <button @click="count++">点我！</button></div>
</template>
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>