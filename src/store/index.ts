import { createPinia, defineStore } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { GlobalTheme } from 'naive-ui'
import { darkTheme } from 'naive-ui'

const Pinia = createPinia()
Pinia.use(piniaPluginPersistedstate)
export { Pinia }

export interface State {
    inverted: boolean
    bodyConfigColor: {
        theme: GlobalTheme | null
    }
    globetrotterShow: boolean,
    constantInverted: boolean
}

/**
 * @module 全局状态
 * @var inverted 菜单 头部 背景颜色控制
 */
export const useCommonStore = defineStore({
    id: 'common',
    state: (): State => ({
        inverted: true,
        bodyConfigColor: {
            theme: darkTheme,
        },
        globetrotterShow: true,
        constantInverted: true,
    }),
    actions: {
        getinverted(isdata: boolean) {
            window.$loadingBar.start();
            this.inverted = isdata
            if (isdata) {
                this.bodyConfigColor = {
                    theme: darkTheme
                }
            } else {
                this.bodyConfigColor.theme = null
            }
            setTimeout(() => {
                window.$loadingBar.finish();
            }, 500)
        },
    },
    persist: {
        paths: ['inverted', 'constantInverted'],
    },
})
