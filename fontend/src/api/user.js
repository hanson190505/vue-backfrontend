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