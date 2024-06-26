import { FileCode, FileImport } from '@vicons/tabler'
import { NButton, NIcon } from 'naive-ui'

export default defineComponent({
	name: 'index-actions-columns',
	props: {
		upFn: Function,
		delFn: Function,
		onEditor: Function
	},
	setup(props) {
		return () => (
			<div class='flex-juspb-alc'>
				<NButton
					type='success'
					ghost
					size='small'
					onClick={ () => props.onEditor() }
				>
					{ {
						icon: () => (
							<NIcon class='scale-X'>
								{ {
									default: () => <FileCode />
								} }
							</NIcon>
						),
						default: () => '查看'
					} }
				</NButton> <NButton
				type='success'
				ghost
				size='small'
				onClick={ () => props.upFn() }
			>
				{ {
					icon: () => (
						<NIcon class='scale-X'>
							{ {
								default: () => <FileImport />
							} }
						</NIcon>
					),
					default: () => '导出'
				} }
			</NButton> <NButton
				type='warning'
				ghost
				size='small'
				onClick={ () => props.delFn() }
			>
				{ {
					icon: () => <NIcon component={ FileImport } />,
					default: () => '导入'
				} }
			</NButton>
			</div>
		)
	}
})
