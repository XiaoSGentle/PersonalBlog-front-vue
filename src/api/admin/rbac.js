import request from '../../utils/request'

export function getAllDepart() {
    return request({
        url: '/admin/authority/depart',
        method: 'get'
    })
}
export function getRoutersByDepart(data) {
    return request({
        url: '/admin/authority/depart/router?depart=' + data,
        method: 'get',
    })
}
export function getUserByDepart(data) {
    return request({
        url: '/admin/authority/depart/user?depart=' + data,
        method: 'get',
    })
}

export function getAllRouter() {
    return request({
        url: '/admin/authority/router',
        method: 'get',
    })
}
export function addRouterForDepart(param) {
    return request({
        url: '/admin/authority/depart/routers',
        method: 'put',
        data: param,
    })
}
export function addUserForDepart(param) {
    return request({
        url: '/admin/authority/depart/users',
        method: 'put',
        data: param,
    })
}
export function getAllUser() {
    return request({
        url: '/admin/user/',
        method: 'get',
    })
}