import { createDiscreteApi, ConfigProviderProps, darkTheme, lightTheme } from 'naive-ui'
import { useCommonStore } from '@/store'

export function createNaiveDiscreteApi() {
  const common = useCommonStore()

  const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
    theme: common.inverted ? darkTheme : lightTheme
  }))

  const { message, notification, dialog, loadingBar } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    {
      configProviderProps: configProviderPropsRef
    }
  )
  window.$message = message
  window.$notification = notification
  window.$dialog = dialog
  window.$loadingBar = loadingBar
}
