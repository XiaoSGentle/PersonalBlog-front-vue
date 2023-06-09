import request from '../../utils/request'

export function getPic(param) {
    return request({
        url: '/admin/pic/?classify=' + param,
        method: 'get'
    })
}
export function delPic(param) {
    return request({
        url: '/admin/pic/' + param,
        method: 'delete'
    })
}





