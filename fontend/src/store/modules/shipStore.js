import {
    getShipOrder,
    getShipDetail,
} from "../../api/ship";

const state = {
    shipOrderData: {},
    shipDetailData: {}
}

const mutations = {
    SET_SHIPORDER: (state, data) => {
        state.shipOrderData = data
    },
    SET_SHIPDETAIL: (state, data) => {
        state.shipDetailData = data
    }
}

const actions = {
    setShipOrderData({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            getShipOrder(params).then(res => {
                commit('SET_SHIPORDER', res.data)
                resolve(res)
                // console.log(res);
            }).catch(error => {
                reject(error)
            })
        })
    },
    setShipDetailData({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            getShipDetail(params).then(res => {
                commit('SET_SHIPDETAIL', res.data)
                resolve(res)
                // console.log(res);
            }).catch(error => {
                reject(error)
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}