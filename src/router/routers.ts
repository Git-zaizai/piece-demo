import { AppRouteRecordRaw } from './types'
import RootView from '@/view/home/index.vue'
import { admin, adminRouters } from './admin'
import LayoutHome from '@/layout/layout-hemo.vue'

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
	children: [
		{
			path: 'test-r',
			name: 'test-r',
			component: () => import('@/view/Test/test.vue'),
			meta: {
				title: 'test'
			},
		}
	]
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
        mod.default.forEach(modv=> hemoRoutes.push(modv.name))
    } else {
        routeModuleList.push(mod.default)
        hemoRoutes.push(mod.default.name)
    }
}

routeModuleList.sort((a, b)=> {
	let aSort = a.sort ?? 100
	let bSort = b.sort ?? 100
	return aSort - bSort
})


const routers = [Root, ...routeModuleList, admin, ...adminRouters]

export { routeModuleList,hemoRoutes }

export default routers
