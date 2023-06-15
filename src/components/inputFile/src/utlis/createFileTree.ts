import type { fileTree, fileItem } from '../types'

function newFileObject(i: number, pathleng: number, name: string, path: string): fileTree {
    if (i === pathleng - 1) {
        return {
            name,
            path: path,
            isfile: true
        }
    } else {
        return {
            name,
            path: path,
            isfile: false,
            children: []
        }
    }
}

/**
 *@function addSubTree 添加子树  使用引用类型内存地址的特性往下查找添加子树
 * @param fileTree  文件树
 * @param path 文件路径
 * */
function addSubTree(fileTree: fileTree, path: string) {
    let fileTreeChildren: fileTree[] = fileTree.children as fileTree[]
    let pathArray: string[] = path.split('/')
    for (let i = 1, leng = pathArray.length; i < leng; i++) {
        const isfolder = fileTreeChildren.find(fileObjectItem => fileObjectItem.name === pathArray[i])
        if (isfolder) {
            // --重点：地址往下移--
            fileTreeChildren = isfolder.children as fileTree[]
        } else {
            const newnode = newFileObject(i, pathArray.length, pathArray[i], pathArray.slice(0, i + 1).join('/'))
            fileTreeChildren.push(newnode)
            // --重点：地址往下移--
            fileTreeChildren = newnode.children as fileTree[]
        }
    }
}


/**
 * @function 获取顶层文件夹名
 * */
function getRootFileName(files: fileItem[]): string {
    if (files.length === 1) {
        return files[0].file.name.split('.').shift()
    }
    const list = []
    const lenList = []
    files.forEach(value => {
        if (value.path === '') return
        const pathArr = value.path.split('/')
        list.push({ len: pathArr.length, ph: pathArr })
        lenList.push(pathArr.length)
    })
    const max = Math.max(...lenList)
    const find = list.find(v => v.len === max)
    return find.ph[0]
}

/**
 * @function createFileTree 构建文件树
 * @param files 文件对象数组
 * */
export function createFileTree(files: fileItem[] | File[]): fileTree {
    const fileList: fileItem[] = files.map((fileItem: fileItem | File) => {
        if ('path' in fileItem) {
            return fileItem
        }
        return {
            file: fileItem,
            path: fileItem.webkitRelativePath
        }
    })

    //初始化 文件树  --》 创建头文件夹
    const fileTreeRootName = getRootFileName(fileList)

    // if (fileList[0])
    const fileTree: fileTree = {
        name: fileTreeRootName,
        path: fileTreeRootName,
        isfile: false,
        children: []
    }

    for (let i = 0, leng = files.length; i < leng; i++) {
        const fileItemPath = fileList[i].path.split('/')
        //判断这个文件路径就在头文件夹下 那就直接插入
        if (fileItemPath.length <= 2) {
            if (fileList[i].file === undefined) {
                fileTree.children?.push({
                    name: fileItemPath.at(-1),
                    path: fileList[i].path,
                    isfile: true,
                })
            } else {
                fileTree.children?.push({
                    name: fileList[i].file.name,
                    path: fileList[i].path,
                    isfile: true,
                })
            }
        } else {
            addSubTree(fileTree, fileList[i].path)
        }
    }
    return fileTree
}
