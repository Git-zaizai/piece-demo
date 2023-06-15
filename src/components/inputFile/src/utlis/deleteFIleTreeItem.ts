import type { fileTree } from '../types'

function deepClone(target) {
    //检测数据类型
    if (typeof target !== 'object' || target === null) {
        // target 是 null ，或者不是对象和数组，说明是原始类型,直接返回
        return target;
    } else {
        //创建一个容器,存储数组或者对象
        const result = Array.isArray(target) ? [] : {};
        //遍历target
        for (let key in target) {
            //检测该属性是否为对象本身的属性(不能拷贝原型对象的属性)
            if (target.hasOwnProperty(key)) {
                //递归遍历子元素，直到能返回原始值
                result[key] = deepClone(target[key]);
            }
        }
        return result;
    }
}

/**
 * @function deepDelDirectory 递归删除空目录
 * */
function deepDelDirectory(fileTteeArray: fileTree[]): void {
    for (let i = 0, len = fileTteeArray.length; i < len; i++) {
        if (fileTteeArray[i].children && fileTteeArray[i].children.length === 0) {
            delete fileTteeArray[i].children
        }
        deepDelDirectory(fileTteeArray[i].children)
    }
}

/**
 * @function deepDelFile 递归删除文件
 * */
function deepDelFile(fileTree: fileTree, fileName: string): void {
    const { children } = fileTree
    if (children) return
    let index = children.findIndex(item => item.name === fileName)
    if (index) {
        children.splice(index, 1)
    } else {
        for (let i = 0, len = children.length; i < len; i++) {
            if (children[i].children && children[i].children.length > 0) {
                deepDelFile(children[i], fileName)
            }
        }
    }
}

export function deleteFIleTreeItem(fileTree: fileTree, fileName: string, isdeepClone?: boolean): fileTree {
    let result: fileTree
    if (isdeepClone) {
        result = deepClone(fileTree)
    } else {
        result = fileTree
    }
    deepDelFile(result, fileName)
    deepDelDirectory(result.children)
    return result
}
