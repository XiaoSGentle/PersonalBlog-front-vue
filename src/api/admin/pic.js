import request from '../../utils/request'

export function getPicClassify(param) {
    return request({
        url: '/admin/pic/classify/?classify=' + param,
        method: 'get'
    })
}
export function delPic(param) {
    return request({
        url: '/admin/pic/' + param,
        method: 'DELETE'
    })
}
export function addPic(param) {
    return request({
        url: '/admin/pic/',
        method: 'post',
        data: param,
    })
}

export function getPic(param) {
    return request({
        url: '/admin/pic/' + param,
        method: 'get'
    })
}
export function upPic(param) {
    return request({
        url: '/admin/pic/',
        method: 'put',
        data: param,
    })
}





