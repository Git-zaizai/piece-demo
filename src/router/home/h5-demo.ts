import { AppRouteRecordRaw } from '../types'

const WebDemo: AppRouteRecordRaw = {
	path: '/h5-demo',
	name: 'h5-demo',
	meta: {
		title: 'h5 demo'
	},
	sort: 2,
	children: [
		{
			path: 'Pulldowntorefresh',
			name: 'Pulldowntorefresh',
			component: () => import('@/view/demo/h5/Pulldowntorefresh/index.vue'),
			meta: {
				title: '移动端下拉刷新 vue3版',
				navigation: {
					contentText: '手搓移动端下拉刷新 vue3版'
				}
			}
		},
	]
}

export default WebDemo
