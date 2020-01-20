import axios from 'axios';
// 封装一个网络基础模块
let postData = null
export function request(config) {
  // 创建一个axios实例
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 5000,
    params: {
      token: window.sessionStorage.getItem('token')
    }
  })
  //axios拦截器(请求局部拦截)
  // instance.interceptors.request.use(config => {
  //   console.log(postData);
  //   console.log('打印请求拦截');
  //   console.log(config);
  //   postData = config.data
  //   console.log(postData);

  //   return config
  // }), err => {
  //   console.log(err);
  // }
  //响应拦截
  // instance.interceptors.response.use(response => {
  //   console.log('打印响应拦截');
  //   console.log(response);
  //   return response
  // }), err => {
  //   console.log(err.response.status)
  // }
  // instance(config)
  //   .then(res => {
  //   resolve(res)
  // })
  //   .catch(err => {
  //   reject(err)
  // })
  //axios.create方法返回的就是一个promise,所以可以按下面这样写
  return instance(config)
}
// //全局拦截
// axios.interceptors.response.use(response => {
//   console.log('打印响应拦截');
//   console.log(response);
//   return response
// }), err => {
//   console.log('打印响应拦截');
//   console.log(err.request)
// }

export function getRangeDateRequest(config) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/orders/',
    timeout: 5000,
  })
  return instance(config)
}
// // 然后在外面这样使用
// import {
//   request
// } from "./network/request";
// request({
//   url: '/books/'
// }).then(res => {
//   this.result = res
// }).catch(res => {
//   console.log(err);
// })