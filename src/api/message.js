import request from '../utils/request'

export function getMessage(param) {
    return request({
        url: '/message/getAllMessage',
        method: 'post',
        data: param
    })
}
export function addMessage(param) {
    return request({
        url: '/message/addMessage',
        method: 'post',
        data: param
    })
}





