import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        orderdetail: null,
        suborderdetail: []
    },
    mutations: {
        //方法,定义操作state的一些方法,所有函数能自动接收state

    },
    actions: {},
    getters: {},
    modules: {}
})

export default store