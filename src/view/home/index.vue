<template>
	<div class="min-w">
		<left-image class="left-image"/>
		<right-image class="right-image"/>
		<div class="box-navigation flex-juc-alc" :style="themeVars">
			<div class="box-list" v-for="item in routeModuleList" :key="item.name">
				<div class="box-list-header el-transition">
					<n-icon size="26" class="box-list-icon el-transition">
						<CubeOutline/>
					</n-icon>
					<h2 class="box-list-title">{{ item.meta.title }}</h2>
				</div>
				<template v-if="item?.children?.length">
					<div class="box-list-item w-100">
						<article
								class="box view-curspointer el-transition"
								:class="boxClass"
								v-for="chItem in item.children"
								:key="chItem.name"
								@click="bindBoxClick(chItem)"
						>
							<div class="box-header">
								<n-icon size="20">
									<FlashOutline/>
								</n-icon>
								<h5 class="box-title">{{ chItem.meta.title }} </h5>
							</div>
							<p class="box-desc">{{ chItem.meta?.navigation?.contentText ?? 'desc' }}</p>
						</article>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>
<script name="home" lang="ts" setup>
import LeftImage from './Left.vue'
import RightImage from './Right.vue'
import { FlashOutline, CubeOutline } from '@vicons/ionicons5'
import { routeModuleList } from '@/router/routers'
import type { AppRouteRecordRaw } from '@/router/types'
import { useThemeVars } from 'naive-ui'
import { useCommonStore } from '@/store'

const comm = useCommonStore()

const boxClass = ref('box-theme')
const themeVars = computed(() => {
	const vars = useThemeVars()
	let dark = {}
	boxClass.value = 'box-theme'
	if (comm.inverted) {
		boxClass.value = 'box-dark'
		dark['--box-back'] = '#202127'
		dark['--box-back-hover'] = '#252732'
	}
	return {
		'--box-box': vars.value.boxShadow1,
		'--box-border': vars.value.borderColor,
		'--box-desc': vars.value.textColor3,
		'--box-back': '#fff',
		'--box-back-hover': vars.value.hoverColor,
		'--box-success': vars.value.successColorHover,
		...dark
	}
})

const router = useRouter()

function bindBoxClick(route: AppRouteRecordRaw) {
	if (/(http|https):\/\/([\w.]+\/?)\S*/ig.test(route.path)) {
		window.open(route.path)
	} else {
		router.push({
			name: route.name
		})
	}
}
</script>
<style lang="scss" scoped>
.left-image {
	position: fixed;
	left: 0;
	// right: calc(50% + 270px);
	// width: calc(50% - 270px);
	min-width: 20vw;
	top: 50%;
	transform: translateY(-50%);
}

.right-image {
	position: fixed;
	right: 0;
	// width: 440px;
	min-width: 20vw;
	top: 50%;
	transform: translateY(-50%);
}

.box-navigation {
	width: 60vw;
	margin: 0 auto;
}

.box-list {
	display: inline-block;
	margin: 20px 0 10px 0;
	
	.box-list-header {
		margin-bottom: 15px;
		display: inline-flex;
		align-items: center;
		
		&:hover {
			transform: scale(1.05);
		}
		
		&:hover .box-list-icon {
			color: var(--box-success);
		}
	}
	
	&-title {
		margin-left: 10px;
	}
	
	.box-list-item {
		display: inline-flex;
		flex-wrap: wrap;
	}
}

.box {
	padding: 12px;
	transition: all 0.25s;
	box-shadow: var(--box-box);
	border-radius: 8px;
	background: var(--box-back);
	margin: 0 20px 15px 0;
	
	&-header {
		display: flex;
		align-items: center;
	}
	
	&-title {
		font-size: 18px;
		font-weight: 700;
		margin-left: 10px;
	}
	
	&-desc {
		display: -webkit-box;
		flex-grow: 1;
		margin-top: 7px;
		line-height: 1.5;
		font-size: 14px;
		color: var(--box-desc);
	}
	
}

.box-theme:hover {
	transform: scale(1.05);
	background: var(--box-back-hover);
}

.box-dark:hover {
	transform: scale(1.1);
	background: var(--box-back-hover);
}
</style>
