/// <reference types="vite/client" />
/// <reference types="@vue/runtime-dom" />

declare interface Window {
    $loadingBar: typeof import('naive-ui').LoadingBarApi
    $dialog: typeof import('naive-ui').DialogApi
    $notification: typeof import('naive-ui').NotificationApi
    $message: typeof import('naive-ui')['MessageApi']
}

interface ImportMetaEnv {
    readonly VITE_EVE: string
    readonly VITE_OPEN: string //是否自动打开浏览器
    readonly VITE_GLOB_API_URL: string //API 接口地址
    readonly VITE_GLOB_API_URL_PREFIX: string // 接口前缀
    readonly VITE_GLOB_IMG_URL: string // 图片前缀地址
    readonly VITE_GLOB_ROUTER_PREFIX: string // 路由前缀
    readonly VITE_BASE_URL: string //项目 base
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

type ZaiColumns<T = any> = import('naive-ui').DataTableColumns<T>