import {
    request
} from "../network/rquest";
import qs from 'qs'

export function getProductType(params) {
    return request({
        url: 'product_type/',
        params: params
    })
}

export function postProductType(data) {
    return request({
        url: 'product_type/',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getProducts(params) {
    return request({
        url: 'products/',
        params: params
    })
}

export function postProducts(data) {
    return request({
        url: 'products/',
        method: 'post',
        data: qs.stringify(data)
    })
}