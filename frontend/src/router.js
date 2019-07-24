import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

const rejectAuthUser = (to, from, next) => {
    if (store.state.isLogin === true) {
        alert('You are already logged in.')
        next('/')
    } else {
        next()
    }
}

const onlyAuthUser = (to, from, next) => {
    if (store.state.isLogin === false) {
        alert('Please login.')
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
            path: '/mypage',
            name: 'mypage',
            beforeEnter: onlyAuthUser,
            component: () => import(/* webpackChunkName: "about" */ './views/Mypage.vue')
        }
    ]
})
