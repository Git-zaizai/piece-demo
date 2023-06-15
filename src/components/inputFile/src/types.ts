export interface fileItem {
    file: File,
    path: string
}

/**
 * @interface fileTree 文件树结构
 * name 文件|文件夹名称
 * path 路径
 * isfile 是否为文件  false 为文件夹  true 为文件
 * children 目录下的文件夹或文件
 * */
export interface fileTree {
    name: string
    path: string
    isfile: boolean
    children?: Array<fileTree>
}

/**
 * @interface DropResult
 * @param DirectoryTree 文件目录树
 * @param filesArray 文件数组
 * */
export interface DropResult {
    filesArray: fileItem[]
    DirectoryTree: fileTree
}
/**
 * @interface DropResultNull 空文件
 * @param DirectoryTree []
 * @param filesArray []
 * */
export interface DropResultNull {
    filesArray: []
    DirectoryTree: {}
}
