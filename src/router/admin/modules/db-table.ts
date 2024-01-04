import { AppRouteRecordRaw } from '../../types'
import { AdminLayout } from '@/router/constant'
import { renderIcon } from '@/utils'

import { BrandAirtable } from '@vicons/tabler'
import { BookStar20Regular } from '@vicons/fluent'

const dbTable: AppRouteRecordRaw = {
    path: '/db-table',
    name: 'db-table',
    component: AdminLayout,
    meta: {
        title: '表',
        icon: renderIcon(BrandAirtable)
    },
    children: [
        {
            path: 'link',
            name: 'link',
            component: () => import('@/view/admin/table/link.vue'),
            meta: {
                title: 'link',
                icon: renderIcon(BookStar20Regular)
            },
        }
    ],
}
export default dbTable
