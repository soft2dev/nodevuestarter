import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import AuthenticationService from '@/services/AuthenticationService'
import storage from '@/services/storage'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: null,
        isLogin: false,
        isLoginError: false,
        errorMsg: null
    },
    mutations: {
        loginSuccess(state, payload) {
            state.isLogin = true
            state.isLoginError = false
            state.userInfo = payload
        },
        loginError(state, payload) {
            state.isLogin = false
            state.isLoginError = true
            state.errorMsg = payload
        },
        logout(state) {
            state.isLogin = false
            state.isLoginError = false
            state.userInfo = null
        }
    },
    actions: {
        async login({ state, commit }, credentials) {
            try {
                const user = await AuthenticationService.login(credentials)
                storage.set('__SITE_USER__', user.data)
                commit('loginSuccess', user.data)
                router.push({ name: 'mypage' })
            } catch (error) {
                commit('loginError', error.response.data.message)
            }
        },
        async signup({ state, commit }, credentials) {
            try {
                const user = await AuthenticationService.signup(credentials)
                storage.set('__SITE_USER__', user.data)
                commit('loginSuccess', user.data)
                router.push({ name: 'mypage' })
            } catch (error) {
                commit('loginError', error.response.data.message)
            }
        },
        async checkLoginStatus({ state, commit }) {
            const user = storage.get('__SITE_USER__')
            if (user) {
                commit('loginSuccess', user)
            } else {
                return false
            }
            try {
                const checkedUser = await AuthenticationService.checkLoginStatus()

                if (!checkedUser || (checkedUser && checkedUser._id !== state.userInfo._id)) {
                    // if there is any change in login status, resave the user info
                    storage.set('__SITE_USER__', state.userInfo)
                }
                return true
            } catch (error) {
                // if there is an error, removes the data from the storage
                storage.remove('__SITE_USER__')
            }
        },
        async logout({ commit }) {
            await router.push({ name: 'home' })
            storage.remove('__SITE_USER__')
            commit('logout')
        }
    }
})
