import type { Component, DefineComponent } from 'vue'

/**
 * @function debounce 函数防抖
 * */
export function debounce(fun, wait = 1500) {
    let timeout = null
    return function () {
        if (timeout) {//如果存在定时器就清空
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            fun.apply(this, arguments)
        }, wait)
    }
}

import { NIcon } from 'naive-ui'

export function renderIcon(icon: Component | DefineComponent) {
    return () => h(NIcon, null, { default: () => h(icon) })
}