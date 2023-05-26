import request from '../utils/request'

export function updataNote(param) {
    return request({
        url: '/note/updateNote',
        method: 'post',
        data: param
    })
}
export function addNote(param) {
    return request({
        url: '/note/addNote',
        method: 'get',
        params: param
    })
}
export function getNotesByUuid(param) {
    return request({
        url: '/note/getNotesByUuid',
        method: 'get',
        params: param
    })
}
export function getAllNote(param) {
    return request({
        url: '/note/getAllNote',
        method: 'post',
        data: param
    })
}
export function getAllNoteClassify() {
    return request({
        url: '/note/getAllNoteClassify',
        method: 'get'
    })
}





