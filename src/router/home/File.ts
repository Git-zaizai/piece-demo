import { AppRouteRecordRaw } from '../types'

const file: AppRouteRecordRaw = {
    path: '/File',
    name: 'File',
    meta: {
        title: '文件',
    },
    children: [
        {
            path: 'upload-v2',
            name: 'upload-v2',
            component: () => import('@/view/Upload-v2/index.vue'),
            meta: {
                title: '文件 upload',
                navigation: {
                    contentText: '小文件存储 2.0',
                },
            },
        },
        {
            path: 'upload',
            name: 'upload',
            component: () => import('@/view/Upload/index.vue'),
            meta: {
                title: '文件 upload',
                navigation: {
                    contentText: '小文件存储 3.0',
                },
            },
        },
    ],
}

export default file
