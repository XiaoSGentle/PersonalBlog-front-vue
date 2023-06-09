import request from '../utils/request'

export function upload(file) {
    const formData = new FormData();
    formData.append('file', file);
    return request({
        url: '/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: file
    })
}





