<template>
  <n-card
      size="small"
      hoverable
      :segmented="{footer: 'soft'}"
      footer-style="margin:0 0;padding: var(--n-padding-bottom) var(--n-padding-bottom);"
  >
    <template #header-extra>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button text class="cent-but">
            <template #icon>
              <n-icon size="16" :component="AirplaneOutline"/>
            </template>
          </n-button>
        </template>
        ......
      </n-tooltip>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button text class="cent-but">
            <template #icon>
              <n-icon size="16" :component="RocketOutline"/>
            </template>
          </n-button>
        </template>
        ......
      </n-tooltip>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button text @click="HelpClick">
            <template #icon>
              <n-icon size="16" :component="Help"/>
            </template>
          </n-button>
        </template>
        解答
      </n-tooltip>
    </template>
    <template #header>
            <span
                class="view-curspointer text-user-select text-dwoe"
                @click="textClick"
            >
              {{ props.routeItem.meta.navigationData.headerText || 'header' }}
            </span>
    </template>
    <div class="flex-juspb-alc view-curspointer" @click.prevent="textClick">
      <span class="text-user-select text-dwoe">{{ props.routeItem.meta.navigationData.contentText || 'content' }}</span>
      <n-button text>
        <template #icon @click="textClick">
          <n-icon size="18" :component="AirplaneTakeOff16Regular"/>
        </template>
      </n-button>
    </div>
    <template #footer>
      <n-gradient-text type="warning" v-if="showFooter">
        解答：{{ props.routeItem.meta.navigationData.footerText || 'footer' }}
      </n-gradient-text>
    </template>
  </n-card>
</template>

<script name="CardItem" lang="ts" setup>
import { Help, RocketOutline, AirplaneOutline } from '@vicons/ionicons5'
import { AirplaneTakeOff16Regular } from '@vicons/fluent'
import { AppRouteRecordRaw } from '@/router/types'


const router = useRouter()

const props = defineProps<{
  routeItem: AppRouteRecordRaw,
}>()

const showFooter = ref(false)

function HelpClick() {
  showFooter.value = !showFooter.value
}

function textClick() {
  router.push({ name: props.routeItem.name })
}
</script>

<style lang="scss" scoped>
.cent-but {
  margin-right: 15px;
}
</style>
