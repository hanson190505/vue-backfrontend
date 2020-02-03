import {
    request
} from "../network/rquest";

export function getSubToken() {
    request({
        baseURL: 'http://192.168.3.45:8000/orders/',
        params: {
            token: window.sessionStorage.getItem('token'),
            st: 'addorder'
        }
    }).then(res => {
        window.sessionStorage.setItem('subtoken', res.data.subtoken)
    })
}

export function delSubtoken() {
    window.sessionStorage.removeItem('subtoken')
}