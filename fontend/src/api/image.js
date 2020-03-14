import {
    request
} from "../network/rquest";

export function getImages(params) {
    return request({
        url: 'upload/',
        params: params
    })
}

export function delImage(id) {
    return request({
        url: `upload/${id}/`,
        method: 'DELETE',
    })
}

export function patchImage(data, id) {
    return request({
        url: `upload/${id}/`,
        method: 'patch',
        data: data
    })
}