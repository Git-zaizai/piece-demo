import { AppRouteRecordRaw } from '../../types'
import { AdminLayout } from '@/router/constant'
import { DatabasePerson24Regular } from '@vicons/fluent'
import { DatabaseExport } from '@vicons/tabler'
import { renderIcon } from '@/utils'

const db: AppRouteRecordRaw = {
    path: '/db',
    name: 'db',
    component: AdminLayout,
    meta: {
        title: '数据库',
        icon: renderIcon(DatabasePerson24Regular)
    },
    children: [
        {
            path: 'db-config',
            name: 'db-config',
            component: () => import('@/view/admin/db/index.vue'),
            meta: {
                title: '数据库导出导入',
                icon: renderIcon(DatabaseExport)
            }
        },
        {
            path: 'db-mysql',
            name: 'db-mysql',
            component: () => import('@/view/admin/db/mysql.vue'),
            meta: {
                title: 'MySQL',
                icon: renderIcon(DatabasePerson24Regular)
            },
        },
        {
            path: 'db-mongodb',
            name: 'db-mongodb',
            component: () => import('@/view/admin/db/mongodb.vue'),
            meta: {
                title: 'mongodb',
                icon: renderIcon(DatabasePerson24Regular)
            },
        },
    ],
}
export default db
