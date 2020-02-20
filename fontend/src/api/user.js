import {
    request
} from "../network/rquest";
import qs from 'qs'

export function getPubKey() {
    return request({
        url: 'staffs/',
        params: {
            pub_key: 'pub_key'
        },
    })
}

export function getLogin(params) {
    return request({
        url: 'staffs/',
        params: params
    })
}

export function register(data) {
    return request({
        url: 'staffs/',
        method: 'post',
        params: {
            register: 'register'
        },
        data: qs.stringify(data)
    })
}

export function getUser(pk) {
    return request({
        url: `staffs/${pk}/`,
        params: {
            getStore: 'getStore'
        }
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