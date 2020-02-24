import axios from 'axios';

export function request(config) {
    const instance = axios.create({
        baseURL: process.env.VUE_APP_API_URL,
        timeout: 5000
    })
    return instance(config)
}