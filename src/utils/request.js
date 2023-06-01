import axios from 'axios'
import { getBaseUrl } from './env'
import store from '../store'
import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus'
import router from '../router'

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

// 路由拦截器
router.beforeEach((to, from) => {
    if (to.fullPath.includes("welcome")) return true
    if (!to.fullPath.includes("login") && !isAuthenticated()) {
        return { path: '/login' }
    }
})

// 验证是否登录

function isAuthenticated() {
    return store.state.isLogin
}

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
    // token过期情况
    if (res.data.status === 419) {
        // 清除登陆信息
        store.commit('loginOut')
        // 弹窗提醒
        ElMessageBox.confirm(
            '您的登录状态过期，请重新登录',
            '温馨提示',
            {
                showCancelButton: false,
                confirmButtonText: '重新登录',
                showClose: false,
                closeOnClickModal: false,
                closeOnPressEscape: false,
                type: 'warning',
                roundButton: true,
            }
        ).then(() => {
            router.push('/login')
            return
        })
    }
    // 报错显示
    if (res.data.status !== 200) {
        ElMessage.error(res.data.msg)
        return
    }


    return res.data
})
export default servise