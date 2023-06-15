import { AppRouteRecordRaw } from '../types'

const Test: AppRouteRecordRaw = {
    path: '/test',
    name: 'test',
    meta: {
        title: '实验',
        homeShow: true,
    },
    children: [
        {
            path: 'test1',
            name: 'test1',
            component: () => import('@/view/Test/space.vue'),
            meta: {
                navigationData: {
                    headerText: '主题变化',
                    contentText: '主题变化',
                    footerText: '主题变化'
                }
            }
        },
        {
            path: 'slot',
            name: 'slot',
            component: () => import('@/view/Test/TestSlot/TestSlot.vue'),
            meta: {
                navigationData: {
                    headerText: 'slot实验',
                    contentText: 'slot实验',
                    footerText: '用于实验某一些东西而保留'
                }
            }
        },
        {
            path: 'render',
            name: 'render',
            component: () => import('@/view/Test/render/index.vue'),
            meta: {
                navigationData: {
                    headerText: 'render',
                    contentText: '在sfc文件中使用自定义jsx render渲染函数，类似于',
                    footerText: '用于实验某一些东西而保留'
                }
            }
        },
    ]
}

export default Test
