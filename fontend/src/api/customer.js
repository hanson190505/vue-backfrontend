import {
    request
} from "../network/rquest";
import qs from 'qs';

export function postCustomer(data) {
    return request({
        url: 'customers/',
        method: 'post',
        params: {
            subtoken: window.sessionStorage.getItem('subtoken')
        },
        data: qs.stringify(data)
    })
}