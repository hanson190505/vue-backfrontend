import {
    request
} from "../network/rquest";
import qs from 'qs';

export function getPurchaseOrder(params) {
    return request({
        url: 'purchases/',
        params: params
    })
}

export function postPurchase(data) {
    return request({
        url: 'purchases/',
        method: 'post',
        params: {
            subtoken: window.sessionStorage.getItem('subtoken')
        },
        data: qs.stringify(data)
    })
}

export function patchPurchase(pk, data) {
    return request({
        url: `purchases/${pk}/`,
        method: 'patch',
        data: qs.stringify(data)
    })
}

export function getPurchaseDetail(params) {
    return request({
        url: 'purchasedetails/',
        params: params
    })
}

export function postPurchaseDetail(data) {
    return request({
        url: 'purchasedetails/',
        method: 'post',
        params: {
            subtoken: window.sessionStorage.getItem('subtoken')
        },
        data: qs.stringify(data)
    })
}

export function patchPurchaseDetail(pk, data) {
    return request({
        url: `purchasedetails/${pk}/`,
        method: 'patch',
        data: qs.stringify(data)
    })
}