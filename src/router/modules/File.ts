import { AppRouteRecordRaw } from '../types'

const file: AppRouteRecordRaw = {
    path: '/File',
    name: 'File',
    meta: {
        title: '文件',
        homeShow: true,
    },
    children: [
        {
            path: 'upload',
            name: 'upload',
            component: () => import('@/view/Upload/index.vue'),
            meta: {
                navigationData: {
                    headerText: '文件',
                    contentText: '小文件云存储 2.0',
                    footerText: '简单的小文件云存储+访问',
                },
            },
        },
    ],
}

export default file
