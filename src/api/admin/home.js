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
        method: 'get',
        data: param
    })
}

export function getAllBgPic() {
    return request({
        url: '/admin/home/allBgPic',
        method: 'get'
    })
}

export function getallSaying() {
    return request({
        url: '/admin/home/allSaying',
        method: 'get'
    })
}





