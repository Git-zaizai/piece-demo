import type { AppRouteRecordRaw } from '@/router/types'
import { commonLay } from '@/router/constant'

/**
 *组装路由
 */
export function assemblyRoute(names: string[]): AppRouteRecordRaw[] {
    return names.map(v => {
        return {
            path: v,
            name: v,
            component: commonLay,
            meta: {
                title: v
            }
        }
    })
}

export function zaiAddRoute() {
    const router = useRouter()

}