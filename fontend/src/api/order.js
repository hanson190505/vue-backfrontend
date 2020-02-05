import {
    request
} from "../network/rquest";
import qs from 'qs'


export function getOrderList(params) {
    return request({
        url: 'orders/',
        params: params
    })
}

export function getOrder(pk, params) {
    return request({
        url: `orders/${pk}/`,
        params: params
    })
}

export function postOrder(data) {
    return request({
        url: 'orders/',
        method: 'post',
        params: {
            subtoken: window.sessionStorage.getItem('subtoken')
        },
        data: qs.stringify(data)
    })
}

export function patchOrder(pk, params, data) {
    return request({
        url: `orders/${pk}/`,
        method: 'patch',
        params: params,
        data: qs.stringify(data)
    })
}

export function getSubOrderList(params) {
    return request({
        url: 'suborders/',
        params: params
    })
}

export function getSubOrder(pk, params) {
    return request({
        url: `suborders/${pk}/`,
        params: params
    })
}

export function patchSubOrder(pk, params, data) {
    return request({
        url: `suborders/${pk}/`,
        method: 'patch',
        params: params,
        data: qs.stringify(data)
    })
}

export function postSubOrder(data) {
    return request({
        url: 'suborders/',
        method: 'post',
        params: {
            subtoken: window.sessionStorage.getItem('subtoken')
        },
        data: qs.stringify(data)
    })
}