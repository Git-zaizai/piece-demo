<template>
  <n-drawer v-model:show="view.drawerShow" :width="view.drawerWidth">
    <n-drawer-content title="主题配置" closable>

      <n-divider>
        主题模式
      </n-divider>

      <n-space vertical justify="space-between">
        <n-space justify="space-between">
          <span>深色主题</span>
          <n-switch :value="common.inverted" @update-value="common.getinverted"></n-switch>
        </n-space>
        <n-space justify="space-between">
          <span>恒定主题</span>
          <n-switch :value="common.constantInverted"
                    @update-value="common.$patch({constantInverted:!common.constantInverted})"/>
        </n-space>
      </n-space>

      <n-divider>
        过渡动画
      </n-divider>

      <n-space justify="space-between">
        <span>页面切换动画类型</span>
        <n-select
            style="width: 120px"
            size="small"
            :value="view.transition.value"
            :options="view.transitionList"
            @update:value="view.setTransition"
        />
      </n-space>

      <n-divider>
        主题
      </n-divider>

      <n-grid :cols="8" :x-gap="8" :y-gap="12" class="">
        <n-grid-item v-for="color in themeColorList" :key="color" class="flex-x-center">
          <ColorCheckbox :color="color" :theme-color="view.themeColor" @click="view.setThemeColor(color)"/>
        </n-grid-item>
      </n-grid>

      <n-space vertical class="mt-px">

        <n-color-picker :modes="['hex']"
                        :value="view.themeColor"
                        :show-alpha="false"
                        @update-value="view.setThemeColor"/>

        <n-button :block="true" @click="setTrue">更多颜色</n-button>

        <n-space justify="space-between" class="mt-px">
          <span class="flex-alc">
            自定义 info 的颜色
          </span>

          <n-tooltip trigger="hover">
            <template #trigger>
              <n-switch :value="view.isCustomizeInfoColor" @update-value="view.setIsCustomizeInfoColor"/>
            </template>
            是否自定义info的颜色(默认取比主题色深一级的颜色)
          </n-tooltip>
        </n-space>

      </n-space>

      <n-button class="mt-auto" type="primary" block dashed @click="view.$reset()">
        <h3>
          重置主题
        </h3>
      </n-button>

    </n-drawer-content>
  </n-drawer>
  <ColorModal :visible="bool" @close="closeModal"/>
</template>

<script name="setting-deawer" setup lang="ts">
import { useViewStore } from '@/store/modules/useViewStore'
import ColorCheckbox from './components/color-checkbox.vue'
import ColorModal from './components/color-modal.vue'
import useBoolean from '@/hooks/use-boolean'
import { useCommonStore } from '@/store'
import { themeColorList } from './colorData'

const view = useViewStore()
const common = useCommonStore()
const { bool, setFalse: closeModal, setTrue } = useBoolean()
</script>

<style lang="scss" scoped>
.mt-px {
  margin-top: 15px;
}

.mt-auto {
  position: absolute;
  width: 87%;
  bottom: 20px;
}
</style>