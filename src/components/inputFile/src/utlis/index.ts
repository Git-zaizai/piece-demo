import { DropResult, DropResultNull, fileItem, fileTree } from '../types'
import { getFilesFromEntries } from './getFilesFromEntries'
import { createFileTree } from './createFileTree'

export { getFilesFromEntries, createFileTree }
export * from './deleteFIleTreeItem'

export default async function useGetFilesDrop(items): Promise<DropResult | DropResultNull> {
    const filesArray: fileItem[] = await getFilesFromEntries(items)
    if (filesArray.length === 0) return { filesArray: [], DirectoryTree: {} }
    const DirectoryTree: fileTree = createFileTree(filesArray)
    return { filesArray, DirectoryTree }
}