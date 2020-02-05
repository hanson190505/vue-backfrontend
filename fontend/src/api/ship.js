import {
    request
} from "../network/rquest";
import qs from 'qs';

//出货订单
export function getShipOrder(params) {
    return request({
        url: 'shiporders/',
        params: params
    })
}

export function getShipOrderPK(pk) {
    return request({
        url: `shiporders/${pk}/`,
    })
}

export function postShipOrder(data) {
    return request({
        url: 'shiporders/',
        method: 'post',
        params: {
            subtoken: window.sessionStorage.getItem('subtoken')
        },
        data: qs.stringify(data)
    })
}

export function patchShipOrder(pk, data) {
    return request({
        url: `shiporders/${pk}/`,
        method: 'patch',
        data: qs.stringify(data)
    })
}

//出货明细
export function getShipDetail(params) {
    return request({
        url: 'shipdetails/',
        params: params
    })
}

export function postShipDetail(data) {
    return request({
        url: 'shipdetails/',
        method: 'post',
        params: {
            subtoken: window.sessionStorage.getItem('subtoken')
        },
        data: qs.stringify(data)
    })
}

export function patchShipDetail(pk, data) {
    return request({
        url: `shipdetails/${pk}/`,
        method: 'patch',
        data: qs.stringify(data)
    })
}