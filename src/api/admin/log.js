
import request from '../../utils/request'

export function getLog(param) {
    return request({
        url: '/admin/log',
        method: 'get',
        params: param,
    })
}
