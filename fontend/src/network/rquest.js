import axios from 'axios';
import store from '../store';
import router from '../router';
// 封装一个网络基础模块
let postData = null
export function request(config) {
  // 创建一个axios实例
  const instance = axios.create({
    baseURL: 'http://192.168.3.45:8000/',
    timeout: 5000,
  })
  //axios拦截器(请求局部拦截)
  instance.interceptors.request.use(config => {
    // let token = window.sessionStorage.getItem('token')
    let token = store.getters.token
    let localToken = window.localStorage.getItem('token')
    if (token) {
      config.headers.authorization = token
      if (config.method === 'post') {
        config.headers.content_type = 'application/x-www-form-urlencoded'
      }
    }
    if (localToken) {
      config.headers.authorization = localToken
      if (config.method === 'post') {
        config.headers.content_type = 'application/x-www-form-urlencoded'
      }
    }
    // console.log('打印请求拦截');
    // console.log(config);
    return config
  }), err => {
    console.log(err.response);
  }
  //响应拦截
  //TODO:拦截403 TOKEN失效
  instance.interceptors.response.use(response => {
    // console.log('打印响应拦截');
    // console.log(response);
    if (response.status === 403) {
      router.replace('/login').catch(err => {})
    }
    return response
  }), error => {
    // console.log(error.response);
  }
  //axios.create方法返回的就是一个promise,所以可以按下面这样写
  return instance(config)
}

export function getRangeDateRequest(config) {
  const instance = axios.create({
    baseURL: 'http://192.168.3.45:8000/orders/',
    timeout: 5000,
  })
  return instance(config)
}
// // 然后在外面这样使用