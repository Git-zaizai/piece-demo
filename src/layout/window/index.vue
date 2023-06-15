<template>
  <n-config-provider :theme="common.bodyConfigColor.theme"
                     :theme-overrides="view.naiveThemeOverrides"
                     :locale="zhCN">
    <n-loading-bar-provider>
      <LoadingBarApi/>
      <n-dialog-provider>
        <DialogContent/>
        <n-notification-provider>
          <NotificationProvider/>
          <n-message-provider>
            <MessageContent/>
            <slot slot="default"></slot>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
<script>
export default { name: 'windowPropoerty' };
</script>

<script setup>
/**
 * @module vue3 naive 要这样挂载方法到window上
 */
import {
  NDialogProvider,
  NNotificationProvider,
  NMessageProvider,
  NLoadingBarProvider,
} from 'naive-ui';
import MessageContent from './components/MessageContent.vue';
import DialogContent from './components/DialogContent.vue';
import LoadingBarApi from './components/LoadingBarApi.vue';
import NotificationProvider from './components/NotificationProvider.vue'
import { zhCN } from 'naive-ui'
import { useViewStore } from '@/store/modules/useViewStore'
import { useCommonStore } from '@/store'

const common = useCommonStore()
const view = useViewStore()
</script>
