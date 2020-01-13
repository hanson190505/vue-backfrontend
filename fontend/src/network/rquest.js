import axios from 'axios';
// 封装一个网络基础模块
export function request(config) {
  // 创建一个axios实例
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 5000,
  })
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

// // 然后在外面这样使用
// import {
//   request
// } from "./network/rquest";
// request({
//   url: '/books/'
// }).then(res => {
//   this.result = res
// }).catch(res => {
//   console.log(err);
// })