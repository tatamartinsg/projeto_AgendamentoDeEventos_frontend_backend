import Vuex from 'vuex'
import Vue from 'vue'
import http from '@/http'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

const estado = {
    token: null,
    _idUser: null,
    counter: 0
}

const mutations = {
    DEFINE_LOGGED_USER(state,{token, _idUser}){
        state.token = token
        state._idUser = _idUser
    },
    LOGOUT_USER(state){
        state._idUser = null
        state.token = null
    }
}

const actions = {
    doLogin({ commit }, usuario){
        return new Promise( (resolve,reject) => {
            http.post('/login', usuario)
            .then(response => {
                commit('DEFINE_LOGGED_USER', {
                    token: response.data.token,
                    _idUser: response.data._idUser
                })
                console.log(response.data)
                resolve(response.data)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }
}

const getters = {
    userIsLogged: state => Boolean(state.token)
}

export default new Vuex.Store({
    state: estado,
    mutations,
    actions,
    getters,
    plugins: [
        createPersistedState({
            storage: {
                getItem: (key) => Cookies.get(key),
                setItem: (key, value) =>
                    Cookies.set(key, value, { expires: 3, secure: true }),
                    removeItem: (key) => Cookies.remove(key),
                },
        })
    ]
})