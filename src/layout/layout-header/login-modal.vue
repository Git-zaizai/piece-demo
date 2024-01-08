<script setup lang="ts" name="login-modal">
import { login } from '@/api'
import local from '@/utils/Storage'

const router = useRouter()
const show = ref(false)
const pad = ref<string>('')
const active = ref(false)
defineExpose({ show })

watch(active, val => {
	if (val) {
		pad.value = 'youke'
	} else {
		pad.value = ''
	}
})

const loginClk = async () => {
	try {
		const res = await login({ pwd: pad.value })
		show.value = false
		local.set('info', res.data.data)
		router.push({ name: 'admin' })
	} catch (e) {
		window.$message.error('啥也没有！')
	}
}
</script>

<template>
	<n-modal v-model:show="show" preset="card" style="width: 300px" title="输入正确有惊喜：">
		<n-form-item>
			<n-input v-model:value="pad" placeholder="什么东西呢！" @keyup.enter.native="loginClk" />
		</n-form-item>
		<n-form-item label="游客模式" label-placement="left">
			<n-switch v-model:value="active" />
		</n-form-item>

		<n-button type="primary" block secondary strong @click="loginClk">
			确定
		</n-button>
	</n-modal>
</template>

<style scoped lang="scss"></style>