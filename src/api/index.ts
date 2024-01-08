import request from './request';

export { request as http }
export const createfolder = data => request.post('/web/createfolder', data)
export const createDirectory = (data) => request.post('/web/createDirectory', data)
export const login = data => request.post('/secretkey', data)
export const verify = data => request.post('/verifyUser', data)

// 获取所有的表
export const getMongoDb = () => request.get('/show-dbs')
export const getMySql = () => request.get('/tables')
export const getDbLists = data => request.get('/export-table', { params: data })
export const upload = (data: FormData) => request.post('/web/upload-home', data)
export const setDbFile = data => request.post('/import-table', data)
export const createTable = data => request.get('/createTable', { params: data })
export const delTable = data => request.get('/delTable', { params: data })