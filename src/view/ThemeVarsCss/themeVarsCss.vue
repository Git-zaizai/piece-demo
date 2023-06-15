<template>
  <div>
    <n-theme-editor/>
    <div class="view">
      <div class="flex-alc-juc">
        <n-el>
          <h1>F12查看</h1>
        </n-el>
      </div>
      <div class="flex-alc">
        <div class="view-flex">
          <h1>亮色主题</h1>
          <div class="view-code">
            <p v-for="(value,key) in themeCssVars">
              {{ key + ':' + value }}
            </p>
          </div>
        </div>
        <div class="view-flex">
          <h1>暗色主题</h1>
          <div class="view-code">
            <p v-for="(value,key) in darkCssVars">
              {{ key + ' : ' + value }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script name="themeVarsCss" setup lang="ts">
import { NThemeEditor, GlobalThemeOverrides, useThemeVars, darkTheme, lightTheme } from 'naive-ui'
import { themeCssVars, darkCssVars } from './cssVars'
import { useOsTheme } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {},
  Button: {}
}
const themeVars = useThemeVars()
console.log('当前主题', useOsTheme())
console.log('亮色所有变量', lightTheme)
console.log('暗色所有变量', darkTheme)
console.log('naive-ui的公共变量', themeVars.value)
</script>

<style lang="scss" scoped>
.view {
  height: $layout-content;
}

.view-flex {
  flex: 1;

  h1 {
    text-align: center;
  }
}

.view-code {
  line-height: 2;
  padding: 0 20px;
  font-size: 16px;
}
</style>