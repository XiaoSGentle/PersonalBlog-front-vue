import request from '../../utils/request'

export function getBlogInfo() {
    return request({
        url: '/admin/home/blogInfo',
        method: 'get'
    })
}
export function setBlogInfo(param) {
    return request({
        url: '/admin/home/blogInfo',
        method: 'put',
        data: param
    })
}

export function getAllBgPic() {
    return request({
        url: '/admin/home/allBgPic',
        method: 'get'
    })
}

export function getallSaying(param) {
    return request({
        url: '/admin/home/allSaying',
        method: 'get',
        params: param
    })
}

export function delSaying(param) {
    return request({
        url: '/admin/home/saying?uuid=' + param,
        method: 'DELETE'
    })
}


export function upSaying(param) {
    return request({
        url: '/admin/home/saying',
        method: 'put',
        data: param
    })
}

export function addSaying(param) {
    return request({
        url: '/admin/home/saying',
        method: 'post',
        data: param
    })
}
export function getSaying(param) {
    return request({
        url: '/admin/home/saying?uuid=' + param,
        method: 'get'
    })
}

