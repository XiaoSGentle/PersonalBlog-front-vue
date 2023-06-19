
import request from '../../utils/request'

export function delMessage(param) {
    return request({
        url: '/admin/message?uuid=' + param,
        method: 'DELETE'
    })
}
