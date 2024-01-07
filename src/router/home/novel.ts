import { AppRouteRecordRaw } from '../types';

const novel: AppRouteRecordRaw = {
    path: '/novel',
    name: 'novel',
    meta: {
        title: '小说',
    },
    children: [
        {
            path: 'http://116.204.106.221/gadgets/n',
            name: 'http://116.204.106.221/gadgets/n',
            meta: {
                navigation: {
                    contentText: '记录一下看过的小说，网址还有评价',
                },
            },
        },
        {
            path: 'http://175.178.151.160/n',
            name: 'http://175.178.151.160/n',
            meta: {
                navigation: {
                    contentText: '记录一下看过的小说，网址还有评价',
                },
            },
        },
    ],
};

export default novel;
