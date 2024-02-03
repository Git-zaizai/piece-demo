import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import type { RouterOptions } from 'vue-router'
import { useTitle } from '@vueuse/core'
import routers from './routers'

const { VITE_GLOB_ROUTER_PREFIX } = import.meta.env

const router = createRouter(<RouterOptions> {
    history: createWebHashHistory(VITE_GLOB_ROUTER_PREFIX),
    routes: routers,
    strict: true,
});

router.beforeEach((to, _from: any) => {
    window.$loadingBar && window.$loadingBar.start();
    useTitle((to.meta?.title as string) ?? '(っ´Ι`)っ')
});

router.afterEach((_: any, _from: any, _failure: any) => {
    window.$loadingBar && window.$loadingBar.finish();
});

router.onError((error) => {
    window.$loadingBar && window.$loadingBar.finish();
    window.$message.error('路由错误！')
    console.log(error)
});

export default router;
