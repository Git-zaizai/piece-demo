<template>
  <div>
    插槽1
    <slot></slot>
    <Slot2>

    </Slot2>
  </div>
</template>

<script>
import Slot2 from './Slot2.vue'

export default {
  name: "Slot1",
  components: {
    Slot2
  }
}
</script>

<style scoped>

</style>
