<template>
	<div class="file-item el-transition-all-200" :style="cssVars">
		<div class="flex-alc">
			<n-icon :size="34">
				<FileInvoice v-if="iconType" />
				<FileImageOutlined v-else />
			</n-icon>

			<p class="file-item-title text-dwoe ml-5 mr-10">{{ fileName }}</p>

			<n-button
					text
					class="ml-10"
					ref="linkSquare"
					@mouseenter="mouseenter(linkSquare,'链接')"
					@mouseleave="mouseleave"
					v-if="link"
			>
				<template #icon>
					<n-icon size="23" color="var(--text-color)">
						<LinkSquare16Regular />
					</n-icon>
				</template>
			</n-button>


			<n-button
					text class="ml-10" ref="eyeOutline" @mouseenter="mouseenter(eyeOutline,'查看图片')"
					@mouseleave="mouseleave"
					v-if="imgShow"
			>
				<template #icon>
					<n-icon size="24" color="var(--text-color)">
						<EyeOutline />
					</n-icon>
				</template>
			</n-button>


			<n-button
					text class="ml-10" ref="arrowClockwise" @mouseenter="mouseenter(arrowClockwise,'重新上传')"
					@mouseleave="mouseleave"
					v-if="displayReUpload"
			>
				<template #icon>
					<n-icon size="21" color="var(--text-color)">
						<ArrowClockwise20Filled />
					</n-icon>
				</template>
			</n-button>


			<n-button
					text class="ml-10" ref="deleteDismiss" @mouseenter="mouseenter(deleteDismiss,'移除')"
					@mouseleave="mouseleave"
					v-if="uploadCompleted"
			>
				<template #icon>
					<n-icon size="22" color="var(--text-color)">
						<DeleteDismiss24Regular />
					</n-icon>
				</template>
			</n-button>

		</div>

		<n-progress
				v-if="percentage > 0 && percentage < 100"
				class="file-item-progress"
				type="line"
				status="success"
				:percentage="percentage"
				:height="1"
				:show-indicator="false"
		/>
	</div>
</template>

<script setup lang="ts">
import { ArrowClockwise20Filled, DeleteDismiss24Regular, LinkSquare16Regular } from '@vicons/fluent'
import { FileImageOutlined } from '@vicons/antd'
import { FileInvoice } from '@vicons/tabler'

import { useThemeVars } from 'naive-ui'
import { useCommonStore } from '@/store'
import { EyeOutline } from '@vicons/ionicons5'

const props = withDefaults(defineProps<{
	iconType: boolean
	imgShow: boolean
	displayReUpload: boolean
	uploadCompleted: boolean
	percentage: number
	fileName: string
	link: string
}>(), {
	iconType: true,
	imgShow: false,
	displayReUpload: false,
	uploadCompleted: false,
	percentage: 3,
	fileName: '',
	link: ''
})

const emit = defineEmits<{
	(e: 'onPopover', x: number, y: number, name?: string): void
}>()

const commStore = useCommonStore()

const cssVars = computed(() => {
	const themeVars = useThemeVars()
	let theme = {
		'--n-color': themeVars.value.actionColor,
		'--text-color': themeVars.value.textColor3,
		'--border-radius': themeVars.value.borderRadius,
		'--primary-color-hover': themeVars.value.primaryColorHover,
		'--back-hover-color': themeVars.value.hoverColor,
		'--fi-box-shadow': '0px 1px 2px #dadada, 0px 4px 7px 0px #d7d4d4;'
	}

	if (commStore.inverted) {
		theme['--fi-box-shadow'] = '0px 1px 2px #252424, 0px 4px 7px 0px #0c0c0c;'
	}
	return theme
})

const linkSquare = ref<HTMLButtonElement | null>()
const eyeOutline = ref<HTMLButtonElement | null>()
const arrowClockwise = ref<HTMLButtonElement | null>()
const deleteDismiss = ref<HTMLButtonElement | null>()

function mouseenter(el: any, name: string) {
	if (el) {
		const { width, top, left } = el.$el.getBoundingClientRect()
		const y = Math.trunc(left + width / 2)
		console.log(width, top, left, el.$el.getBoundingClientRect())
		emit('onPopover', y, top, name)
	}
}

function mouseleave() {
	emit('onPopover', -1, -1)
}
</script>

<style lang="scss" scoped>
.file-item {
  display: inline-flex;
  flex-direction: column;
  background: var(--n-color);
  border-radius: var(--border-radius);
  color: var(--text-color);
  padding: 8px 14px 8px 8px;
  box-shadow: var(--fi-box-shadow);


  &-title {
    font-size: 20px;
		font-weight: 600;
  }

  &:hover {
    background: var(--back-hover-color);
  }
}

.file-item-progress {
  margin-top: 5px;
  margin-left: 2px;
}
</style>