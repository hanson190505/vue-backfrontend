import {
    getPurchaseOrder,
    postPurchase,
    getPurchaseDetail
} from "../../api/purchase";

const state = {
    purchaseData: {},
    purchaseDetailData: {}
}

const mutations = {
    SET_PURCHASE: (state, purchaseData) => {
        state.purchaseData = purchaseData
    },
    SET_PURCHASEDETAIL: (state, purchaseDetailData) => {
        state.purchaseDetailData = purchaseDetailData
    },
    REMOVE_PURCHASEDETAIL: (state) => {
        state.purchaseDetailData = []
    }
}

const actions = {
    //获取采购单
    setPurchaseData({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            getPurchaseOrder(params).then(res => {
                commit('SET_PURCHASE', res.data)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //新增采购单
    addPurchaseOrder({
        commit,
        dispatch
    }, purchaseorder) {
        return new Promise((resolve, reject) => {
            postPurchase(purchaseorder).then(res => {
                //新增采购单之后,重新获取采购单
                dispatch('setPurchaseData', {
                    page: 1,
                    page_size: 10
                })
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    //获取采购明细
    setPurchaseDetailData({
            commit,
        },
        params) {
        return new Promise((resolve, reject) => {
            getPurchaseDetail(params).then(res => {
                commit('SET_PURCHASEDETAIL', res.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    //新增订单明细
    async addPurchaseDetailData({
        commit
    }, newData) {
        try {
            return new Promise((resolve, reject) => {
                commit('SET_PURCHASEDETAIL', newData);
                console.log(newData);
                resolve();
            });
        } catch (error) {
            reject(error);
        }
    },
    //清空订单明细数据
    async removePurchaseDetailData({
        commit
    }) {
        try {
            return new Promise((resolve, reject) => {
                commit('REMOVE_PURCHASEDETAIL');
                resolve();
            });
        } catch (error) {
            reject(error);
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}