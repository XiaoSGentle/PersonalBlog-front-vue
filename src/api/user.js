import request from '../utils/request'

export function Login(param) {
    return request({
        url: '/Login',
        method: 'post',
        data: param
    })
}
export function Register(param) {
    return request({
        url: '/register',
        method: 'post',
        data: param
    })
}





export function getAuthority(param) {
    return request({
        url: '/getAuthority',
        method: 'get'
    })
}