import Api from '@/services/Api'

export default {
    signup(credentials) {
        return Api().post('api/v1.0/auth/register/local', credentials)
    },
    login(credentials) {
        return Api().post('api/v1.0/auth/login/local', credentials)
    },
    checkLoginStatus() {
        return Api().get('api/v1.0/auth/check', { withCredentials: true })
    }
}

