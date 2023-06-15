<template></template>
<script>
import { useNotification } from 'naive-ui'; // content export default defineComponent({ setup () {
export default {
  name: 'NotificationProvider',
  setup() {
    window.$notification = useNotification();
  },
};
</script>
