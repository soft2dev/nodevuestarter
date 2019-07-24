import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: null,
        allUsers: [
            { id: 1, name: 'soft2dev', email: 'sen.web@hotmail.com', password: '123' },
            { id: 2, name: 'hoza', email: 'logo@gmail.com', password: '123' }
        ],
        isLogin: false,
        isLoginError: false
    },
    mutations: {
        loginSuccess(state, payload) {
            state.isLogin = true
            state.isLoginError = false
            state.userInfo = payload
        },
        loginError(state) {
            state.isLogin = false
            state.isLoginError = true
        }
    },
    actions: {
        login({ state, commit }, loginObj) {
            console.log(loginObj)
            let selectedUser = null
            state.allUsers.forEach(user => {
                if (user.email === loginObj.email) selectedUser = user
            })
            if (selectedUser === null || selectedUser.password !== loginObj.password) {
                commit('loginError')
            } else {
                commit('loginSuccess', selectedUser)
                router.push({ name: 'mypage' })
            }
        }
    }
})
