import { AppRouteRecordRaw } from '../types'

const novel: AppRouteRecordRaw = {
    path: '/novel',
    name: 'novel',
    meta: {
        title: '小说',
        homeShow: true,
    },
    children: [
        {
            path: 'http://175.178.151.160/gadgets/n',
            name: 'http://175.178.151.160/gadgets/n',
            component: () => import('@/view/Upload/index.vue'),
            meta: {
                navigationData: {
                    headerText: '小说站点',
                    contentText: '记录一下看过的小说，网址还有评价',
                    footerText: '记录一下小说',
                },
            },
        },
    ],
}

export default novel
