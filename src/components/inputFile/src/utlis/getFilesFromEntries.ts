/**
 * @function 资料
 *https://blog.csdn.net/tangran0526/article/details/104156857#:~:text=%E4%B8%8A%E4%BC%A0%E4%B8%89%E5%90%88%E4%B8%80%EF%BC%9A%E6%8B%96%E6%8B%BD%E4%B8%8A%E4%BC%A0%E3%80%81%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6%E3%80%81%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6%E5%A4%B9%EF%BC%8C%E4%B8%80%E6%AC%A1%E6%90%9E%E5%AE%9A%EF%BC%81%201%201%20%E6%8B%96%E6%8B%BD%E4%B8%8A%E4%BC%A0%20%E5%9C%A8%20drop%20%E4%BA%8B%E4%BB%B6%E4%B8%AD%E9%80%9A%E8%BF%87%20e.dataTransfer.items,%E4%B8%89%E5%90%88%E4%B8%80%20%E8%BF%99%E4%B8%89%E7%A7%8D%E4%B8%8A%E4%BC%A0%E9%80%94%E5%BE%84%EF%BC%8C%E6%9C%80%E7%BB%88%E9%83%BD%E6%8B%BF%E5%88%B0%20File%20%E5%AF%B9%E8%B1%A1%EF%BC%9A%20%E4%BD%86%E6%98%AF%EF%BC%8C%E6%96%87%E4%BB%B6%E7%9A%84%E7%9B%B8%E5%AF%B9%E8%B7%AF%E5%BE%84%E6%A0%BC%E5%BC%8F%E4%B8%8D%E7%BB%9F%E4%B8%80%EF%BC%8C%E9%9C%80%E8%A6%81%E5%A4%84%E7%90%86%EF%BC%8C%E7%BB%9F%E4%B8%80%E6%A0%BC%E5%BC%8F%E4%B8%BA%20%E6%96%87%E4%BB%B6%E5%A4%B91%2F%E6%96%87%E4%BB%B6%E5%A4%B92%2Fa.txt%20%E3%80%82%20
 *https://blog.csdn.net/qq_35900705/article/details/115128331?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_utm_term~default-0-115128331-blog-114137500.pc_relevant_multi_platform_whitelistv1_exp2&spm=1001.2101.3001.4242.1&utm_relevant_index=3
 *https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/items
 *https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransferItemList
 *https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransferItem
 *https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransferItem/webkitGetAsEntry
 *https://stackoverflow.com/questions/45052875/how-to-convert-fileentry-to-standard-javascript-file-object-using-chrome-apps-fi
 * */

import type { fileItem } from '../types'

/**
 * @function getFile FileEntry对象 转格式为 file对象
 * @param fileEntry FileEntry对象
 * @returns {File}
 * @host https://stackoverflow.com/questions/45052875/how-to-convert-fileentry-to-standard-javascript-file-object-using-chrome-apps-fi
 * */
async function getFile(fileEntry): Promise<File | undefined> {
    try {
        return await new Promise((resolve, reject) => fileEntry.file(resolve, reject));
    } catch (err) {
        throw Error(`${fileEntry.name} 转格式为 file对象 失败! ${err}`)
    }
}

function directory(entry: FileSystemDirectoryEntry): Promise<ReadonlyArray<FileSystemEntry | FileSystemDirectoryEntry>> {
    return new Promise(resolve => {
        let directoryReader = entry.createReader()
        directoryReader.readEntries(entries => {
            resolve(entries)
        }, error => {
            throw Error(`获取目录信息失败！错误: ${JSON.stringify(error)}`)
        });
    })
}

/**
 * @function recursionGetFile 递归获取文件
 * */
async function recursionGetFile(fileentryarray: ReadonlyArray<FileSystemEntry | FileSystemDirectoryEntry>): Promise<FileSystemEntry[]> {
    const fileSystemEntries: Array<FileSystemEntry | FileSystemDirectoryEntry> = []
    for (const item of fileentryarray) {
        if (item.isDirectory) {
            //获取文件夹下的文件信息，进行递归
            const readEntriesList = await directory(item as FileSystemDirectoryEntry)
            //判断是空文件夹就进入下一次循环
            if (readEntriesList.length === 0) continue
            const res = await recursionGetFile(readEntriesList)
            fileSystemEntries.push(...res)
        } else {
            fileSystemEntries.push(item)
        }
    }
    return fileSystemEntries
}

async function nodeFileEntry(fileEntryArray: FileSystemEntry[]): Promise<fileItem[]> {
    const fileArray: fileItem[] = []
    for (const item of fileEntryArray) {
        const itemFile = await getFile(item)
        fileArray.push({ file: itemFile, path: item.fullPath.replace('/', '') })
    }
    return fileArray
}

export async function getFilesFromEntries(items: readonly DataTransferItem[]): Promise<fileItem[]> {
    const fileSystemEntryArray: FileSystemEntry[] = await recursionGetFile(Array.from(items)
        .map(v => v.webkitGetAsEntry()))
    return nodeFileEntry(fileSystemEntryArray)
}
