import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

const rejectAuthUser = (to, from, next) => {
    if (store.state.isLogin === true) {
        next('/')
    } else {
        next()
    }
}

const onlyAuthUser = async (to, from, next) => {
    store.dispatch('checkLoginStatus')
    if (store.state.isLogin === false) {
        next('/')
    } else {
        next()
    }
}

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
        },
        {
            path: '/login',
            name: 'login',
            beforeEnter: rejectAuthUser,
            component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
        },
        {
            path: '/signup',
            name: 'signup',
            beforeEnter: rejectAuthUser,
            component: () => import(/* webpackChunkName: "about" */ './views/Signup.vue')
        },
        {
            path: '/mypage',
            name: 'mypage',
            beforeEnter: onlyAuthUser,
            component: () => import(/* webpackChunkName: "about" */ './views/Mypage.vue')
        }
    ]
})
