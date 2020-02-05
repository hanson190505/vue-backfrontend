import {
    login
} from "@/api/user";

const state = {
    name: '',
    token: ''
}

const mutations = {
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    REMOVE_USER: (state) => {
        state.name = ''
        state.token = null
    }
}

const actions = {
    loginSet({
        commit
    }, loginform) {
        return new Promise((resolve, reject) => {
            login(loginform).then(res => {
                commit('SET_NAME', res.data.name)
                commit('SET_TOKEN', res.data.token)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    async logout({
        commit
    }) {
        try {
            return new Promise((resolve, reject) => {
                commit('REMOVE_USER');
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