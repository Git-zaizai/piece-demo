<script setup lang="tsx">
import { ZaiTable } from '@/components/table'
import { http } from '@/api'
import { NTag, NButton, NSpace } from 'naive-ui'
import ModalForm from '@/components/modal-form.vue'
import { copyStr, rand } from '@/utils/index'
import dayjs from 'dayjs'

function randTagType(): any {
	const list = ['default', 'success', 'error', 'warning', 'primary', 'info']
	return list[rand(0, list.length)]
}

export interface Link {
	linkName: string
	urli: string
}

export interface Row {
	beizhu: string
	start: number
	finish: number
	duwan: number
	wanjie: number
	id: number
	isdel: number
	title: string
	link: string
	linkback: string
	links: Link[]
	tabs: string[]
	addDate: string
	update: string
	finishtime: string
	rate: any[]
}

const columns: ZaiColumns = [
	{
		title: '小说名',
		key: 'title',
		width: 200,
		fixed: 'left'
	},
	{
		title: '读到那章',
		key: 'start-finish',
		render: row => `${ row.start } - ${ row.finish }`,
		width: 90
	},
	{
		title: '读完',
		key: 'duwan',
		render(row) {
			let tagType = 'success',
					txt = '读完'
			if (row.duwan == '0') {
				tagType = 'warning'
				txt = '未读完'
			}
			
			return (
					// @ts-ignore
					<NTag bordered={ false } type={ tagType }>
						{ txt }
					</NTag>
			)
		},
		width: 90,
		sorter: 'default'
	},
	{
		title: '标签',
		key: 'tabs',
		render(row: any) {
			return (
					<NSpace>
						{ row.tabs.map(item => (
								<NTag bordered={ false } type={ randTagType() }>
									{ item }
								</NTag>
						)) }
					</NSpace>
			)
		},
		minWidth: 200,
		filterOptions: [
			{
				label: '小说',
				value: '小说'
			},
			{
				label: '推荐',
				value: '推荐'
			},
			{
				label: '漫画',
				value: '漫画'
			},
			{
				label: '动漫',
				value: '动漫'
			},
			{
				label: '有声小说',
				value: '有声小说'
			},
			{
				label: '一口气看完',
				value: '一口气看完'
			}
		],
		filter(value: string, { tabs }: {
			tabs: string[]
		}) {
			return tabs.includes(value)
		}
	},
	{
		title: '完结/连载',
		key: 'wanjie',
		render(row) {
			let reco = '完结'
			if (row.wanjie == 1) {
				reco = '连载'
			}
			return (
					<NTag bordered={ false } type='info'>
						{ row.wanjie == 1 ? '完结' : '连载' }
					</NTag>
			)
		},
		width: 110,
		sorter: 'default'
	},
	{
		title: '删除状态',
		key: 'isdel',
		render(row) {
			return (
					<NTag bordered={ false } type={ row.isdel ? 'success' : 'default' }>
						{ row.isdel ? '显示' : '隐藏' }
					</NTag>
			)
		},
		width: 110,
		sorter: 'default'
	},
	{
		title: '首页链接',
		key: 'link',
		render(row) {
			return (
					<NButton strong tertiary size={ 'small' } onClick={ () => copyStr(row.link as string) }>
						{ row.link ? '复制' : '无' }
					</NButton>
			)
		},
		width: 90
	},
	{
		title: '后续链接',
		key: 'linkback',
		render(row) {
			return (
					<NButton strong tertiary size={ 'small' } onClick={ () => copyStr(row.linkback as string) }>
						{ row.linkback ? '复制' : '无' }
					</NButton>
			)
		},
		width: 90
	},
	{
		title: '备注',
		key: 'beizhu',
		ellipsis: {
			tooltip: true
		},
		width: 90
	},
	{
		title: '其他链接',
		key: 'links',
		render(row: any) {
			if (!row.links.length) {
				return (
						<NTag bordered={ false } type={ 'default' }>
							无
						</NTag>
				)
			}
			return row.links.map(item => (
					<NButton strong tertiary size={ 'small' } onClick={ () => copyStr(item.urli) }>
						{ item.linkName }
					</NButton>
			))
		},
		width: 90
	},
	
	{
		title: '添加时间',
		key: 'addDate',
		render: row => dayjs(row.addDate as string).format('YYYY-MM-DD HH:mm:ss'),
		width: 160
	},
	{
		title: '修改时间',
		key: 'update',
		render: row => dayjs(row.update as string).format('YYYY-MM-DD HH:mm:ss'),
		width: 160
	},
	{
		title: '看完时间',
		key: 'finishtime',
		render: row => dayjs(row.finishtime as string).format('YYYY-MM-DD HH:mm:ss'),
		width: 160
	},
	{
		title: '评分',
		key: 'rate',
		render: (row: any) => {
			if (!row.rate.length) {
				return (
						<NTag bordered={ false } type={ 'default' }>
							无
						</NTag>
				)
			}
			return row.rate.map(item => (
					<NTag bordered={ false } type={ 'default' }>
						{ item }
					</NTag>
			))
		},
		width: 90
	}
]

const formEl = {
	duWan: [
		{
			value: 0,
			label: '未读完'
		},
		{
			value: 1,
			label: '读完'
		}
	],
	rec: [
		{
			value: 0,
			label: '小说'
		},
		{
			value: 1,
			label: '推荐'
		}
	]
}

const rules = {
	title: {
		trigger: 'blur',
		required: true,
		validator(_, val: string) {
			if (val === '') {
				return new Error('不能为空')
			}
			if (isAction && state.data.some(v => v.title === val)) {
				return new Error('小说名不能相同')
			}
			return true
		}
	}
}

const state = reactive({
	data: [],
	form: {
		title: '',
		startfinish: [0, 1],
		tabs: [],
		wanjie: 0,
		isdel: 1,
		link: '',
		linkback: '',
		
		chapter: '',
		duwan: 0,
		recommended: 0,
		url: '',
		chapterUrl: '',
		beizhu: '',
	},
	show: false
})

const tabs = ref(["小说", "推荐", "漫画", "动漫", "有声小说", "一口气看完", "其他", "爽文", "gl", "甜文", "无敌文"])


const init = async () => {
	try {
		const { data } = await http.get('/curd-mongo/find/novel', { params: { ops: { many: true } } })
		/*state.data = data.data
		 .map(v => {
		 v.title = '**dsd4' + rand(0, 100)
		 return v
		 })
		 .reverse()*/
		state.data = data.data.reverse()
	} catch (e) {
		console.error('init', e)
	}
}
onMounted(() => {
	init()
})

// 判断是add\update
let isAction = true
const formRef = ref()

const tableAdd = () => {
	state.form = {
		title: '',
		chapter: '',
		duwan: 0,
		recommended: 0,
		url: '',
		chapterUrl: '',
		beizhu: '',
		isdel: 1
	}
	isAction = true
	state.show = true
}

const updateItem = row => {
	isAction = false
	state.form = toRaw(row)
	state.show = true
}

const formSubmit = () => {
	formRef.value.validate(async (err: any) => {
		try {
			if (!err) {
				let url = isAction ? '/novel/add' : '/novel/update'
				let body: any = state.form
				if (!isAction) {
					body.where = {
						title: state.form.title
					}
				}
				const res = await http.post(url, state.form)
				if (isAction) {
					// const res = await http.get("/desc-limit/novel")
					state.data.unshift(Object.assign(state.form, res.data.data))
					state.form = {
						title: '',
						chapter: '',
						duwan: 0,
						recommended: 0,
						url: '',
						chapterUrl: '',
						beizhu: '',
						isdel: 1
					}
				}
				window.$message.success('操作成功')
			}
		} catch (err) {
			console.log(err)
		}
	})
}

const delItem = async (row, index) => {
	// await http
	//   .post("/novel/update", {
	//     where: { title: row.title },
	//     isdel: !row.isdel
	//   })
	//   .catch(err => Promise.reject(err))
	await http.post('/novel/update', { isdel: state.form?.isdel ?? 0 })
	state.data[index].isdel = Number(!row.isdel)
}
</script>

<template>
	<div>
		<zai-table
				:columns="columns"
				:data="state.data"
				checkbox-key="_id"
				@add="tableAdd"
				@flushed="init"
				@del-item="delItem"
				@update-item="updateItem"
				scroll-x
		/>
		<modal-form v-model:show="state.show" @confirm-form="formSubmit" style="width: 60vw">
			<n-form
					ref="formRef"
					label-placement="left"
					label-width="100"
					label-align="left"
					:model="state.form"
					:rules="rules"
					@keyup.enter="formSubmit"
			>
				
				<n-form-item label="小说名:" path="title">
					<n-input placeholder="小说名" clearable v-model:value="state.form.title"/>
				</n-form-item>
				
				<n-form-item label="读到那章:" path="start-finish">
					<n-input
							pair
							separator="-"
							clearable
							v-model:value="state.form.startfinish"
					/>
				</n-form-item>
				
				<n-form-item label="读完：">
					<n-radio-group v-model:value="state.form.duwan" name="radiogroup">
						<n-space>
							<n-radio-button :value="1" label="读完"/>
							<n-radio-button :value="0" label="未读完"/>
						</n-space>
					</n-radio-group>
				</n-form-item>
				
				<n-form-item label="标签：">
					<n-checkbox-group v-model:value="state.form.tabs">
						<n-space item-style="display: flex;">
							<n-checkbox v-for="item in tabs" :value="item" :label="item"/>
						</n-space>
					</n-checkbox-group>
				</n-form-item>
				
				<n-form-item label="完结/连载：">
					<n-radio-group v-model:value="state.form.wanjie" name="radiogroup">
						<n-space>
							<n-radio-button :value="1" label="完结"/>
							<n-radio-button :value="0" label="连载"/>
						</n-space>
					</n-radio-group>
				</n-form-item>
				
				<n-form-item label="删除状态：">
					<n-radio-group v-model:value="state.form.isdel" name="radiogroup">
						<n-space>
							<n-radio-button :value="1" label="显示"/>
							<n-radio-button :value="0" label="隐藏"/>
						</n-space>
					</n-radio-group>
				</n-form-item>
				
				<n-form-item label="首链接:">
					<n-input placeholder="" clearable v-model:value="state.form.link"/>
				</n-form-item>
				
				<n-form-item label="后续链接:">
					<n-input placeholder="" clearable v-model:value="state.form.linkback"/>
				</n-form-item>
				
				<n-form-item label="备注：">
					<n-input placeholder="备注" type="textarea" clearable v-model:value="state.form.beizhu"/>
				</n-form-item>
				
				<n-form-item label="其他链接:">
					<n-input placeholder="" clearable v-model:value="state.form.linkback"/>
				</n-form-item>
				
				<n-form-item label="评分:">
					<n-input placeholder="" clearable v-model:value="state.form.linkback"/>
				</n-form-item>
			
			</n-form>
		</modal-form>
	</div>
</template>

<style scoped lang="scss"></style>
