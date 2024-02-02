<template>
  <h1>{{ getda.code }}</h1>
  <button @click="updatecode">update</button>
</template>
<script setup lang="ts">
import { useCache } from './test.ts'
const { setDataToCache, getDataFromCache, clearAllCache } = useCache()
const obj1 = { code: 1 }
setDataToCache('obj1', obj1, 1000 * 10)
const getda = getDataFromCache('obj1')
const updatecode = () => {
  debugger
  getda.casdas = 30000
}
</script>
