import {
    request
} from "../network/rquest";
import qs from 'qs'

export function login(data) {
    return request({
        url: 'users/',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getUser(pk) {
    return request({
        url: `user/${pk}/`,
    })
}

export function getUserInfo(params) {
    return request({
        url: 'staffs/',
        params: params
    })
}

export function patchUser(pk, data) {
    return request({
        url: `staffs/${pk}/`,
        method: 'patch',
        data: qs.stringify(data)
    })
}