import { AppRouteRecordRaw } from './types'
import RootView from '@/view/home/index.vue'
import { admin, adminRouters } from './admin'

/**
 * @param 主路由
 */
const Root: AppRouteRecordRaw = {
    path: '/',
    name: 'Root',
    component: RootView,
    meta: {
        keepAlive: 'Home',
        title: 'root'
    },
}

/**
 * @param 主路由
 */
const test: AppRouteRecordRaw = {
    path: '/test',
    name: 'test',
    component: () => import('@/view/Test/test/test.vue'),
    meta: {
        title: 'test'
    },
}

/**
 * @function 自动注册路由
 */
const routeModules = import.meta.glob('./home/*.ts', { eager: true })
const routeModuleList: AppRouteRecordRaw[] = [];
const hemoRoutes = ['Root']

for (const key in routeModules) {
    const mod = routeModules[key] as { default: AppRouteRecordRaw }
    if (Array.isArray(mod.default)) {
        routeModuleList.push(...mod.default)
        mod.default.forEach(modv => hemoRoutes.push(modv.name))
    } else {
        routeModuleList.push(mod.default)
        hemoRoutes.push(mod.default.name)
    }
}

const routers = [Root, test, ...routeModuleList, admin, ...adminRouters]

export { routeModuleList, hemoRoutes }

export default routers
