import type { DataTableBaseColumn, DataTableColumns, DataTableColumn } from 'naive-ui'

function getWidth(value: DataTableColumn) {
  return Math.max(...['width', 'maxWidth', 'minWidth'].map(key => {
    return value[key] ? Number(value[key]) : 30
  }))
}

/**
 * @function 计算table的scrollx的wdith
 * @param columns 
 * @param scrollX 
 * @param actionsColumns 
 * @returns 
 */
export function getScrollX(
  columns: DataTableColumns,
  scrollX: boolean,
  actionsColumns: any
): number | undefined {
  let res
  if (scrollX && columns.length > 0) {
    columns.forEach((value) => {
      res += getWidth(value)
    })
    // 最后加上操作栏
    if (actionsColumns) {
      res += actionsColumns?.width ?? 200
    } else {
      res += 200
    }
  }
  return res
}
