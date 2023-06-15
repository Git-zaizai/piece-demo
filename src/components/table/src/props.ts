import { PropType } from 'vue'
import type { DataTableBaseColumn, PaginationProps, DataTableColumns } from 'naive-ui'

export const ZaiTableProps = {
    checkbox: {
        type: Boolean,
        default: true
    },
    data: {
        type: Array,
        default: () => [],
        required: true
    },
    columns: {
        type: Array as PropType<DataTableColumns>,
        default: () => [],
        required: true
    },
    actionsColumns: {
        type: Object as PropType<DataTableBaseColumn>,
    },
    scrollX: {
        type: Boolean,
        default: false
    },
    pagination: {
        type: Object as PropType<PaginationProps>,
        default: () => {}
    },
    checkboxKey: {
        type: String,
        required: true
    },
    // table的loading
    loading: {
        type: Boolean,
        default: undefined
    },
    // 在刷新的时候展示loading 第一次加载也是刷新所以第一次也是会出现 loading
    // ** loading 没有传入才有有效 loading 传入了就没有作用 **
    initLoading: {
        type: Boolean,
        default: true
    },
}