import request from '../utils/request'

export function get_user() {
    return request({
        url: '/get_user',
        method: 'get'
    })
}





