# 代码

```ts
import { createApp, h, createVNode, render } from 'vue'
import messageTag from './message-tag.vue'

export const createAppFn = () => {
	console.time()
	createApp(messageTag).mount(document.querySelector('#vue-render'))
	console.timeEnd()
	console.log('createApp')
}

export const hFn = () => {
	console.time()
	render(h(messageTag), document.querySelector('#vue-render1'))
	console.timeEnd()
	console.log('h')
}

export const createVNodeFn = () => {
	console.time()
	render(createVNode(messageTag), document.querySelector('#vue-render2'))
	console.timeEnd()
	console.log('createVNode')
}

import messageTag1Vue from './message-tag-1.vue'
import messageTag2Vue from './message-tag-2.vue'
import messageTag3Vue from './message-tag-3.vue'

export const createAppFn1 = () => {
	console.time()
	createApp(messageTag1Vue).mount(document.querySelector('#vue-render-1'))
	console.timeEnd()
	console.log('createApp')
}

export const hFn2 = () => {
	console.time()
	render(h(messageTag2Vue), document.querySelector('#vue-render-2'))
	console.timeEnd()
	console.log('h')
}

export const createVNodeFn3 = () => {
	console.time()
	render(createVNode(messageTag3Vue), document.querySelector('#vue-render-3'))
	console.timeEnd()
	console.log('createVNode')
}
```