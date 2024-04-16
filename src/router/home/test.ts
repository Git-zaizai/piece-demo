import { AppRouteRecordRaw } from '../types'

const router: AppRouteRecordRaw = {
  name: 'test',
  path: '/test',
  component: () => import('@/view/Test/test.vue'),
  meta: {
    title: '试验地'
  },
  children: []
}
const testViewComponents = import.meta.glob('@/view/Test/**/*.vue', { eager: true })

Object.keys(testViewComponents).map(key => {
  const phs = key.split('/')
  if (phs.at(-1) === 'index.vue') {
    router.children.push({
      name: phs.at(-2),
      path: phs.at(-2),
      component: (testViewComponents[key] as { default: any }).default,
      meta: {
        title: phs.at(-2)
      }
    })
  }
})
console.log("🚀 ~ testViewComponents:", testViewComponents)


export default router
