<script setup lang="ts">
const props = defineProps<{
  show: boolean
  formBtnLoading?: boolean
  displaydirective?: boolean
}>()
const emit = defineEmits(['update:show', 'update:formBtnLoading', 'confirmForm'])

const showModal = computed({
  set: val => {
    emit('update:show', val)
  },
  get: () => props.show
})
const butLoading = computed({
  set: val => {
    butLoading.value = val
    emit('update:formBtnLoading', val)
  },
  get: () => props.formBtnLoading ?? false
})
</script>

<template>
  <n-modal
    v-model:show="showModal"
    :display-directive="displaydirective ? 'show' : 'if'"
    :show-icon="false"
    preset="dialog"
    title="新建"
  >
    <slot></slot>
    <template #action>
      <n-space>
        <n-button type="tertiary" @click="() => (showModal = false)">取消</n-button>
        <n-button
          type="success"
          :loading="butLoading"
          @click="
            () => {
              emit('confirmForm')
            }
          "
          >确定</n-button
        >
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped lang="scss"></style>
