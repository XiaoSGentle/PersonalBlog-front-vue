import request from '../../utils/request'

export function getBanner(param) {
    return request({
        url: '/banner?classify=' + param,
        method: 'get'
    })
}
export function updateBanner(param) {
    return request({
        url: '/banner',
        method: 'put',
        data: param,
    })
}
export function addHomeBanner(param) {
    return request({
        url: '/banner',
        method: 'post',
        data: param
    })
}
export function delHomeBanner(param) {
    return request({
        url: '/banner?uuid=' + param,
        method: 'DELETE'
    })
}



