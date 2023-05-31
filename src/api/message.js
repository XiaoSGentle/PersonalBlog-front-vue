import request from '../utils/request'

export function getMessage(param) {
    return request({
        url: '/message/all',
        method: 'get',
        params: param
    })
}
export function addMessage(param) {
    return request({
        url: '/message',
        method: 'post',
        data: param
    })
}





