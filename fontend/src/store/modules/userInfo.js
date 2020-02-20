import {
    getLogin,
    getUser
} from "@/api/user";

const state = {
    name: '',
    token: '',
    permissions: 0,
    id: 0
}

const mutations = {
    SET_ID: (state, id) => {
        state.id = id
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_PERMISSIONS: (state, permissions) => {
        state.permissions = permissions
    },
}

const actions = {
    loginSet({
        commit
    }, loginform) {
        return new Promise((resolve, reject) => {
            getLogin(loginform).then(res => {
                if (res.data.status === 2000) {
                    commit('SET_NAME', res.data.name)
                    commit('SET_TOKEN', res.data.token)
                    commit('SET_PERMISSIONS', res.data.permissions)
                    commit('SET_ID', res.data.id)
                    window.localStorage.setItem('token', res.data.token)
                }
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    userSet({
        commit
    }, pk) {
        return new Promise((resolve, reject) => {
            getUser(pk).then(res => {
                commit('SET_NAME', res.data.u_name)
                commit('SET_TOKEN', res.data.token)
                commit('SET_PERMISSIONS', res.data.permissions)
                commit('SET_ID', res.data.id)
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
                commit('SET_NAME', '')
                commit('SET_TOKEN', '')
                commit('SET_PERMISSIONS', 0)
                commit('SET_ID', 0)
                window.localStorage.removeItem('token')
                resolve();
            });
        } catch (error) {
            reject(error);
        }
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}