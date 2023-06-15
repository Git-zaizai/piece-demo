/**
 * @function 资料
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
        console.error(`${fileEntry.name} 转格式为 file对象 失败!`, err)
    }
}

function nodeFile(fileEntry): Promise<File | Error> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fileEntry.file((file) => {
                resolve(file)
            }, e => {
                reject(e)
                console.error(`${fileEntry.name} 转格式为 file对象 失败!`, e)
            })
        })
    })
}

function directory(entry): Promise<FileSystemEntry[] | FileSystemDirectoryEntry[] | Error> {
    return new Promise((resolve, reject) => {
        let directoryReader = entry.createReader()
        directoryReader.readEntries(entries => {
            resolve(entries)
        }, error => {
            reject(error)
        });
    })
}

/**
 * @function recursionGetFile 递归获取文件
 * */
async function recursionGetFile(items): Promise<fileItem[]> {
    const fileList: fileItem[] = []
    for (const item of items) {
        const entry: FileSystemFileEntry = typeof item.webkitGetAsEntry === 'function' ? item.webkitGetAsEntry() : item
        if (entry.isDirectory) {
            //获取文件夹下的文件信息，进行递归
            const readEntriesList = await directory(entry)
            const res = await recursionGetFile(readEntriesList)
            fileList.push(...res)
        } else {
            const fileObj = await getFile(entry)
            if (fileObj === undefined) continue
            fileList.push({ file: fileObj, path: entry.fullPath.replace('/', '') })
        }
    }
    return fileList
}


/**
 * @function recursionGetFile 递归获取文件
 * */
async function _recursionGetFile(items): Promise<FileSystemEntry[]> {
    const fileSystemEntries: FileSystemEntry[] = []
    for (const item of items) {
        const entry: FileSystemEntry = item.webkitGetAsEntry()
        if (entry.isDirectory) {
            //获取文件夹下的文件信息，进行递归
            const readEntriesList = await directory(entry)
            const res = await _recursionGetFile(readEntriesList)
            fileSystemEntries.push(...res)
        }
        fileSystemEntries.push(entry)
    }
    return fileSystemEntries
}

export async function nodeFileEntry(fileEntryArray) {
    const fileArray = []
    for (const item of fileEntryArray) {
        const itemFile = await getFile(item)
        fileArray.push(itemFile)
    }
    return fileArray
}

export async function getFilesDrop(items): Promise<fileItem[]> {
    // console.log(items)
    //
    // const aras = await _recursionGetFile(items)
    // console.log(aras)
    // const filePop = await nodeFileEntry(aras)
    // console.log(filePop)
    /*const fileList: fileItem[] = []
    let _resolve
    debugger

    function r_recursionGetFile(itemss) {
        itemss.forEach(item => {
            debugger
            const entry = typeof item.webkitGetAsEntry === 'function' ? item.webkitGetAsEntry() : item
            if (entry.isDirectory) {
                //获取文件夹下的文件信息，进行递归
                let directoryReader = entry.createReader()
                directoryReader.readEntries(entryes => {
                    r_recursionGetFile(entryes)
                }, error => {
                    console.log(error)
                })
            } else {
                console.log('else')
                entry.file((file) => {
                    console.log('file', file)
                    fileList.push({ file: file, path: entry.fullPath.replace('/', '') })
                }, e => {
                    console.error(`${entry.name} 转格式为 file对象 失败!`, e)
                })
            }
        })
    }

    await new Promise(resolve => {
        _resolve = resolve
        r_recursionGetFile(Array.from(items))
    })

    console.log(fileList)*/

    //文件数组
    const filesArray: fileItem[] = await recursionGetFile(items)

    console.log(filesArray)

    return filesArray
}
