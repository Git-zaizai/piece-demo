import { AppRouteRecordRaw } from '../types'

const novel: AppRouteRecordRaw = {
  path: '/novel',
  name: 'novel',
  meta: {
    title: '其他'
  },
  children: [
    {
      path: 'https://git-zaizai.github.io/zaizaiDocs/',
      name: 'https://git-zaizai.github.io/zaizaiDocs/',
      meta: {
        title: '崽崽前端囧途',
        navigation: {
          contentText: '切图崽的囧途'
        }
      }
    },
    {
      path: 'https://novel.xiaoheizishiba.top/',
      name: 'https://novel.xiaoheizishiba.top/',
      meta: {
        title: '崽崽记录站 v3',
        navigation: {
          contentText: '崽崽记录站 v3 vite+react18+hox'
        }
      }
    },
    {
      path: 'http://116.204.106.221/gadgets/online-html/novel.html',
      name: 'http://116.204.106.221/gadgets/online-html/novel.html',
      meta: {
        title: '崽崽记录站 v2',
        navigation: {
          contentText: '崽崽记录站 v2 vue3+html构建'
        }
      }
    },
    {
      path: 'http://175.178.151.160/n',
      name: 'http://175.178.151.160/n',
      meta: {
        title: '崽崽记录站 v1',
        navigation: {
          contentText: '崽崽记录站 v1 Jquery构建'
        }
      }
    }
  ]
}

export default novel
