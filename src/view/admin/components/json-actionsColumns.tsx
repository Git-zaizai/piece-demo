import { FileImport, FileCode } from '@vicons/tabler'
import { NButton, NIcon } from 'naive-ui'

export default defineComponent({
	name: 'json-actions-columns',
	props: {
		onEditor: Function,
		onExport: Function,
		onImport: Function,
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
						default: () => '编辑'
					} }
				</NButton>
				<NButton
				type='success'
				ghost
				size='small'
				onClick={ () => props.onExport() }
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
				onClick={ () => props.onImport() }
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
