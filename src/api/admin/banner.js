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





