import { AppRouteRecordRaw } from '../types'

const WebDemo: AppRouteRecordRaw = {
  path: '/demo',
  name: 'demo',
  meta: {
    title: 'demo'
  },
  sort: 1,
  children: [
    {
      path: 'tab-demo',
      name: 'tab-demo',
      component: () => import('@/view/demo/web/tab/index.vue'),
      meta: {
        title: 'tabDemo',
        navigation: {
          contentText: 'tab可滚动的'
        }
      }
    },
    {
      path: 'space',
      name: 'space',
      component: () => import('@/view/demo/web/space.vue'),
      meta: {
        title: '主题变化',
        navigation: {
          contentText: '有各种UI组件展示主题变化'
        }
      }
    },
    {
      path: 'slot',
      name: 'slot',
      component: () => import('@/view/demo/web/TestSlot/TestSlot.vue'),
      meta: {
        title: 'slot实验',
        navigation: {
          contentText: 'slot 插槽实验'
        }
      }
    },
    {
      path: 'monacoEditor',
      name: 'monacoEditor',
      component: () => import('@/view/demo/web/monacoEditor/index.vue'),
      meta: {
        title: 'monaco-editor',
        navigation: {
          contentText: '使用了 @monaco-editor/loader 这个包'
        }
      }
    },
    {
      path: 'naive-ui-css',
      name: 'naive-ui-css',
      component: () => import('@/view/ThemeVarsCss/themeVarsCss.vue'),
      meta: {
        title: 'naive-ui-css',
        navigation: {
          contentText: 'NaiveUI的样式颜色'
        }
      }
    },
    {
      path: 'naive-ui-code',
      name: 'naive-ui-code',
      component: () => import('@/view/demo/web/code.vue'),
      meta: {
        title: 'naive-ui-code naive-ui-code',
        navigation: {
          contentText: 'NaiveUI 组件的试验地'
        }
      }
    },
    {
      path: 'vue-render',
      name: 'vue-render',
      component: () => import('@/view/demo/web/vue-render/index.vue'),
      meta: {
        title: 'vue render',
        navigation: {
          contentText: 'vue3 函数式创建组件渲染组件'
        }
      }
    },
    {
      path: 'md-to-vue',
      name: 'md-to-vue',
      component: () => import('@/view/demo/web/mdtovue.md'),
      meta: {
        title: 'md-to-vue',
        navigation: {
          contentText: '在vite中解析md文件转换vue组件'
        }
      }
    },
    {
      path: 'vitepress-code',
      name: 'vitepress-code',
      component: () => import('@/view/demo/web/vitepress-code.md'),
      meta: {
        title: 'vitepress-code',
        navigation: {
          contentText: '使用vitepress的转换器'
        }
      }
    },
    {
      path: 'tables',
      name: 'tables',
      component: () => import('@/view/demo/web/tables/index.vue'),
      meta: {
        title: '好看的tables',
        navigation: {
          contentText: '好看的tables'
        }
      }
    },
    {
      path: 'grid',
      name: 'grid',
      component: () => import('@/view/demo/web/grid/index.vue'),
      meta: {
        title: 'grid 布局',
        navigation: {
          contentText: 'grid 布局 demo'
        }
      }
    },
    {
      path: 'NumberAnimation',
      name: 'NumberAnimation',
      component: () => import('@/view/demo/web/digitalgrowth.vue'),
      meta: {
        title: '数字动画',
        navigation: {
          contentText: '数字动画实现'
        }
      }
    },
    {
      path: 'video-zhen',
      name: 'video-zhen',
      component: () => import('@/view/demo/web/video/video-zhen.vue'),
      meta: {
        title: '获取视频帧',
        navigation: {
          contentText: '获取视频帧'
        }
      }
    }
  ]
}

export default WebDemo
