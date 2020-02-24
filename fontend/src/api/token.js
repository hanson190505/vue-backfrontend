import {
    request
} from "../network/rquest";

export function getSubToken() {
    request({
        url: 'orders/',
        params: {
            st: 'addorder'
        }
    }).then(res => {
        window.sessionStorage.setItem('subtoken', res.data.subtoken)
    })
}

export function delSubtoken() {
    window.sessionStorage.removeItem('subtoken')
}