import { AppRouteRecordRaw } from '../types'

const Demo: AppRouteRecordRaw = {
  path: '/demo',
  name: 'demo',
  meta: {
    title: 'demo'
  },
  children: [
    {
      path: 'tab-demo',
      name: 'tab-demo',
      component: () => import('@/view/Test/tab/index.vue'),
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
      component: () => import('@/view/Test/space.vue'),
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
      component: () => import('@/view/Test/TestSlot/TestSlot.vue'),
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
      component: () => import('@/view/Test/monacoEditor/index.vue'),
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
      component: () => import('@/view/Test/code.vue'),
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
      component: () => import('@/view/Test/vue-render/index.vue'),
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
      component: () => import('@/view/Test/mdtovue.md'),
      meta: {
        title: 'md-to-vue',
        navigation: {
          contentText: '在vite中解析md文件转换vue组件'
        }
      }
    },
    {
      path: 'Loading',
      name: 'Loading',
      component: () => import('@/view/Test/Loading/index.vue'),
      meta: {
        title: 'Loading动画'
      }
    }
  ]
}

export default WebDemo
