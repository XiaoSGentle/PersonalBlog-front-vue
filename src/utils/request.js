import axios from 'axios'
import { getBaseUrl } from './env'
import store from '../store'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
//创建Axios实例
const servise = axios.create(
    {
        //基础url
        baseURL: getBaseUrl(),
        //超时设置
        timeout: 10000
    }
)

// 请求拦截器
servise.interceptors.request.use(config => {
    const isToken = (config.headers || {}).isToken === false
    let token = store.state.Token;
    if (token !== '' && !isToken) {
        config.headers['Authorization'] = 'Bearer ' + store.state.Token; // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
        let url = config.url + '?';
        for (const propName of Object.keys(config.params)) {
            const value = config.params[propName];
            var part = encodeURIComponent(propName) + "=";
            if (value && typeof (value) !== "undefined") {
                if (typeof value === 'object') {
                    for (const key of Object.keys(value)) {
                        let params = propName + '[' + key + ']';
                        var subPart = encodeURIComponent(params) + "=";
                        url += subPart + encodeURIComponent(value[key]) + "&";
                    }
                } else {
                    url += part + encodeURIComponent(value) + "&";
                }
            }
        }
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
    }
    return config
}, error => {
    console.log(error);
})

//响应拦截器
servise.interceptors.response.use(res => {

    return res.data
})
export default servise