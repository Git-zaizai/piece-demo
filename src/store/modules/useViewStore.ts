import { getNaiveThemeOverrides } from '@/utils/color'
import type { GlobalThemeOverrides } from 'naive-ui'

export type ThemeAnimateMode = 'zoom-fade' | 'zoom-out' | 'fade-slide' | 'fade' | 'fade-bottom' | 'fade-scale'

/** 其他主题颜色 */
interface OtherColor {
  /** 信息 */
  info: string
  /** 成功 */
  success: string
  /** 警告 */
  warning: string
  /** 错误 */
  error: string
}

export interface AnimateMode {
  value: ThemeAnimateMode
  label: string
}

export interface State {
  /** 过渡动画列表 */
  transitionList: AnimateMode[]
  /** 过渡动画 */
  transition: AnimateMode
  /** 主题配置抽屉宽度 */
  drawerWidth: number
  /** 主题颜色 */
  drawerShow: boolean
  themeColor: string
  /** 是否自定义info的颜色(默认取比主题色深一级的颜色) */
  isCustomizeInfoColor: boolean
  otherColor: OtherColor
}

export const useViewStore = defineStore('viewStore', {
  state: (): State => ({
    transitionList: [
      {
        value: 'zoom-fade',
        label: '渐变'
      },
      {
        value: 'zoom-out',
        label: '闪现'
      },
      {
        value: 'fade-slide',
        label: '滑动'
      },
      {
        value: 'fade',
        label: '消退'
      },
      {
        value: 'fade-bottom',
        label: '底部消退'
      },
      {
        value: 'fade-scale',
        label: '缩放消退'
      }
    ],
    transition: {
      value: 'fade',
      label: '消退'
    },
    drawerWidth: 370,
    drawerShow: false,
    themeColor: '#18a058',
    isCustomizeInfoColor: false,
    otherColor: {
      // info: "#2080f0",
      // success: "#18a058",
      // warning: "#f0a020",
      // error: "#d03050",
      info: '#2080f0',
      success: '#18a058',
      warning: '#f0a020',
      error: '#d03050'
    }
  }),
  getters: {
    getTransition(state): AnimateMode {
      return state.transition
    },
    /** naiveUI的主题配置 */
    naiveThemeOverrides(state): GlobalThemeOverrides | null {
      if (state.themeColor === '#18a058') return null
      return getNaiveThemeOverrides(
        {
          primary: state.themeColor,
          ...state.otherColor
        },
        state.isCustomizeInfoColor
      )
    }
  },
  actions: {
    /** 开启关闭主题配置抽屉 */
    setDrawerShow(): void {
      this.drawerShow = !this.drawerShow
    },
    /** 设置主题颜色 */
    setThemeColor(themeColor: string) {
      this.themeColor = themeColor
    },
    /** 设置过渡动画 */
    setTransition(value: string) {
      this.transition = this.transitionList.find(v => v.value === value)
    },
    /** 是否自定义info的颜色 */
    setIsCustomizeInfoColor(value: boolean) {
      this.isCustomizeInfoColor = value
    }
  },
  persist: {
    paths: ['transition', 'themeColor']
  }
})
