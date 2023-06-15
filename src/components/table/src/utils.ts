import type { DataTableBaseColumn, DataTableColumns } from 'naive-ui'

export function getScrollX(columns: DataTableColumns, scrollX: boolean, actionsColumns: any): number | undefined {
    let res = null
    if (scrollX && columns.length > 0) {
        columns.forEach(value => {
            if (value.width) {
                res += Number(value.width)
            } else {
                res += 30
            }
        })
        // 最后加上操作栏
        if (actionsColumns) {
            res += actionsColumns?.width ?? 200
        } else {
            res += 200
        }
    } else {
        res = undefined
    }
    return res
}