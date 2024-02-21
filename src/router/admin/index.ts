import { AppRouteRecordRaw } from '../types'
import { AdminLayout } from '../constant'
import { DashboardOutlined } from '@vicons/antd'
import { renderIcon } from '@/utils'

export const admin: AppRouteRecordRaw = {
    path: '/admin',
    name: 'admin',
    component: AdminLayout,
    redirect: '/admin/console',
    meta: {
        title: 'admin',
    },
    children: [
        {
            path: 'console',
            name: 'admin-console',
            component: () => import('@/view/admin/index.vue'),
            meta: {
                title: '主控台',
                icon: renderIcon(DashboardOutlined)
            }
        }
    ],
}

const routeModules = import.meta.glob('./modules/**.ts', { eager: true })
const adminRouters = []
for (const key in routeModules) {
    const mod = routeModules[key] as { default: AppRouteRecordRaw }
    if (Array.isArray(mod.default)) {
        adminRouters.push(...mod.default)
    } else {
        adminRouters.push(mod.default)
    }
}
adminRouters.reverse()
export { adminRouters }