import request from '../../utils/request'

export function getSysInfo() {
    return request({
        url: '/admin/statis/sys',
        method: 'get'
    })
}






