import { AppRouteRecordRaw } from '../types';

const Test: AppRouteRecordRaw = {
  path: '/tab-demo',
  name: 'tab-demo',
  meta: {
    title: 'tabs',
    homeShow: true,
  },
  children: [
    {
      path: 'tab-demo-index',
      name: 'tab-demo-index',
      component: () => import('@/view/Test/tab/index.vue'),
      meta: {
        navigationData: {
          headerText: 'tab',
          contentText: 'tab可滚动的',
          footerText: '',
        },
      },
    },
  ],
};

export default Test;
