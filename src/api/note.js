import request from '../utils/request'

export function updataNote(param) {
    return request({
        url: '/note',
        method: 'put',
        data: param
    })
}
export function addNote(param) {
    return request({
        url: '/note',
        method: 'post',
        params: param
    })
}
export function getNotesByUuid(param) {
    return request({
        url: '/note/' + param,
        method: 'get'
    })
}
export function getAllNote(param) {
    return request({
        url: '/note/all',
        method: 'get',
        params: param
    })
}
export function getAllNoteClassify() {
    return request({
        url: '/note/classify',
        method: 'get'
    })
}





