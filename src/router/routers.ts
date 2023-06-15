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
        title: '( *￣▽￣)'
    },
}

/**
 * @function 自动注册路由
 */
const routeModules = import.meta.glob('./modules/*.ts', { eager: true })
const routeModuleList: AppRouteRecordRaw[] = [];
for (const key in routeModules) {
    const mod = routeModules[key] as { default: AppRouteRecordRaw }
    if (Array.isArray(mod.default)) {
        routeModuleList.push(...mod.default)
    } else {
        routeModuleList.push(mod.default)
    }
}

const routers = [Root, ...routeModuleList, admin, ...adminRouters]

export { routeModuleList }

export default routers
