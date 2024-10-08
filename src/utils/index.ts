import type { Component, DefineComponent } from 'vue'
// @ts-ignore
import { NIcon } from 'naive-ui'

/**
 * @function debounce 函数防抖
 * */
export function debounce(fun, wait = 1500) {
  let timeout = null
  return function () {
    if (timeout) {
      //如果存在定时器就清空
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      fun.apply(this, arguments)
    }, wait)
  }
}



export function renderIcon(icon: Component | DefineComponent) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

export function copyStr(value: string): void {
  if (!value) return
  const execCommand = (): void => {
    const el = document.createElement('input')
    el.value = value
    document.body.appendChild(el)
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
      el.setSelectionRange(0, value.length)
      el.focus()
    } else {
      el.select()
    }
    if (document.execCommand('copy')) {
      window.$message.success('复制成功')
    } else {
      window.$message.error('复制失败')
    }
    el.blur()
    el.remove()
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(value).then(
      function () {
        window.$message.success('复制成功')
      },
      function () {
        execCommand()
      }
    )
  } else {
    execCommand()
  }
}

/**
 * @function 范围随机数
 * @param m
 * @param n
 * @returns
 */
export function rand(m: number, n: number) {
  return Math.ceil(Math.random() * (n - m + 1) + m - 1)
}

export function waitTime<T>(data?: T): Promise<T> {
  return new Promise(resolve => {
    let time = rand(0, 3) * 1000
    setTimeout(() => {
      resolve(data)
    }, time)
  })
}


/**
 * @function isMobile 判断手机端
 * */
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function addScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve()
    }
    script.onerror = () => {
      reject()
    }
    document.body.appendChild(script)
  })
}