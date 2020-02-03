import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

const store = new Vuex.Store({
    modules,
    getters,
    // state: {
    //     orderdetail: null,
    //     suborderdetail: [],
    //     order_number: '',
    //     username: '',
    //     purchase_number: ''
    // },
    // mutations: {
    //     //方法,定义操作state的一些方法,所有函数能自动接收state

    // },
    // actions: {},
    // getters: {},
    // modules: {}
})

export default store