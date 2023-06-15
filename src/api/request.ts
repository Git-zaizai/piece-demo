import axios from 'axios';
import config from './config';
import router from '../router';
import type { CreateAxiosOptions } from './types'
import Storage from "@/utils/Storage";

const request = axios.create(config);

request.interceptors.request.use(
    (config: CreateAxiosOptions) => {
        const userinfo = Storage.get('userinfo')
        // 请求拦截器配置处理
        config.headers['token'] = userinfo ? userinfo.token : ''
        return config;
    },
    error => {
        // 请求拦截器错误捕获
        window.$notification.error({
            meta: error,
            title: '网络错误！',
        });
        return error;
    },
);

request.interceptors.response.use(
    (response) => {
        const $message = window['$message'];
        switch (response.status) {
            case 401:
                $message.error('用户没有权限（令牌、用户名、密码错误）!');
                setTimeout(() => {
                    router.push('/login');
                }, 1500);
                break;
            default:
                break;
        }
        return response;
    },
    error => {
        console.log(error.response)
        console.log(error.message)
        const status = error?.response?.status ?? '500'

        if (error?.response?.status === 404) {
            window.$message.error('404')
        }

        if (error.message.includes('Network Error')) {
            window.$message.error('意外错误！(￣３￣)  ' + `status: ${ status }`)
        }

        if (error.message.includes('ERR_NETWORK')) {
            window.$message.error('无法连接后台，意外错误！ ' + `status: ${ status }`)
        }

        if (error.message.includes('timeout')) {
            // 判断请求异常信息中是否含有超时timeout字符串
            window.$message.error('网络超时！ ' + `status: ${ status }`);
        }
        if (error.message.includes('code 500')) {
            window.$message.error('http:返回码 500 (￣３￣)  ' + `status: ${ status }`);
        }

        return Promise.reject(error);
    },
);

export default request;
