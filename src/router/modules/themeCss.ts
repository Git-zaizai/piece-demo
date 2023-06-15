import { AppRouteRecordRaw } from '../types'

const Test: AppRouteRecordRaw = {
    path: '/theme-css',
    name: 'theme-css',
    meta: {
        title: 'NaiveUI-css',
        homeShow: true,
    },
    children: [
        {
            path: 'theme-css-index',
            name: 'theme-css-index',
            component: () => import('@/view/ThemeVarsCss/themeVarsCss.vue'),
            meta: {
                navigationData: {
                    headerText: 'NaiveUI-css',
                    contentText: 'NaiveUI的样式颜色',
                    footerText: ''
                }
            }
        }
    ]
}

export default Test
