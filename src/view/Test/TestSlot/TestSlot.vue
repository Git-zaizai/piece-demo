<template>
  <div class="aa">
    <Slot1>
      拉手机号登录框架
    </Slot1>
  </div>
</template>

<script>
import Slot1 from './Slot1.vue'
export default {
  name: "TestSlot",
  components:{
    Slot1
  }
}
</script>

<style scoped>
.aa{
  background-color: #515a6e;
}
</style>
