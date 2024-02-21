import { AppRouteRecordRaw } from '../types'

const novel: AppRouteRecordRaw = {
  path: '/novel',
  name: 'novel',
  meta: {
    title: '小说'
  },
  children: [
    {
      path: 'https://xiaoheizishiba.top/reactnovel',
      name: 'https://xiaoheizishiba.top/reactnovel',
      meta: {
        title: '崽崽记录站',
        navigation: {
          contentText: 'react vite'
        }
      }
    },
    {
      path: 'http://116.204.106.221/gadgets/n',
      name: 'http://116.204.106.221/gadgets/n',
      meta: {
        title: '崽崽记录站',
        navigation: {
          contentText: 'html + vue3 (不维护了)'
        }
      }
    },
    {
      path: 'http://175.178.151.160/n',
      name: 'http://175.178.151.160/n',
      meta: {
        title: '崽崽记录站',
        navigation: {
          contentText: 'html + Jq (第一版 早废了)'
        }
      }
    }
  ]
}

export default novel
