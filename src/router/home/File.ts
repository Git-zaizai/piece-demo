import { AppRouteRecordRaw } from '../types'

const file: AppRouteRecordRaw = {
    path: '/File',
    name: 'File',
    meta: {
        title: '文件',
    },
    children: [
        {
            path: 'upload',
            name: 'upload',
            component: () => import('@/view/Upload/index.vue'),
            meta: {
                title: '文件 upload',
                navigation: {
                    contentText: '小文件存储 2.0',
                },
            },
        },
    ],
}

export default file
