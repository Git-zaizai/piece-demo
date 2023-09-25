<template>
	<n-layout-header bordered class="nav">
		<n-text tag="div" class="ui-logo" :depth="1" @click="handleLogoClick">
			<n-gradient-text :size="26" type="success">
				( *￣▽￣)(っ´Ι`)っ
			</n-gradient-text>
		</n-text>
		<div class="nav-end flex-alc">
			<n-button size="small" quaternary class="nav-picker"
				@click="commonstore.getinverted(!commonstore.inverted)">
				{{ commonstore.inverted ? '白昼' : '黑夜' }}
			</n-button>
			<n-button size="small" tag="a" quaternary class="nav-picker" @click="loginShow">
				后台(っ´Ι`)っ
			</n-button>
			<n-button size="small" quaternary class="nav-picker" @click="topgithub">
				GitHub
			</n-button>
			<n-text class="nav-picker padded">
				1.5.0
			</n-text>
			<n-button size="small" quaternary class="nav-picker" @click="view.setDrawerShow">
				<n-icon size="22">
					<CodeSandboxOutlined />
				</n-icon>
			</n-button>
		</div>
	</n-layout-header>
	<login-modal ref="loginModalRef" />
</template>

<script name="header-index" lang="ts" setup>
	import { CodeSandboxOutlined } from '@vicons/antd'
	import { useCommonStore } from '@/store'
	import { useViewStore } from '@/store/modules/useViewStore'
	import LoginModal from './login-modal.vue'
	import Storage from '@/utils/Storage'
	import { verify } from '@/api'

	const view = useViewStore()
	const commonstore = useCommonStore()
	const router = useRouter()
	const route = useRoute()
	const loginModalRef = ref<typeof LoginModal | null>(null)

	function handleLogoClick() {
		const path = route.path
		if (path === '/') {
			window.$message.info('别点了，你已经在首页了')
			return
		}
		router.push('/')
	}

	const { VITE_EVE } = import.meta.env
	const loginShow = async () => {
    // if (VITE_EVE == '0') {
    //   return router.push({ name: 'admin' })
    // }
		try {
			const data = Storage.get('info')
			if (data) {
				await verify({ info: data })
				router.push({ name: 'admin' })
			} else {
				loginModalRef.value.show = true
			}
		} catch (e) {
			console.log(e)
			loginModalRef.value.show = true
		}
	}
	const topgithub = () => {
		window.open('https://github.com/Git-zaizai/home-demo')
	}
</script>

<style lang="scss" scoped>
	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32px;
		height: 64px;
	}

	.ui-logo {
		cursor: pointer;
		display: flex;
		align-items: center;
		font-size: 18px;
	}

	.nav-picker {
		margin-right: 4px;
	}

	.nav-picker.padded {
		padding: 0 10px;
		line-height: 16px;
	}

	.nav-picker:last-child {
		margin-right: 0;
	}
</style>