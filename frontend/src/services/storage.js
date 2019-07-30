import VueCookies from 'vue-cookies'

export default (() => {
    const st = localStorage || { }
    return {
        set: (key, object) => {
            st[key] = typeof object === 'string' ? object : JSON.stringify(object)
            // VueCookies.set('access_token', object.access_token)
        },
        get: key => {
            if (!st[key]) {
                return null
            }
            const value = st[key]

            try {
                const parsed = JSON.parse(value)
                return parsed
            } catch (e) {
                return value
            }
        },
        remove: key => {
            if (VueCookies.get('access_token')) {
                VueCookies.remove('access_token')
            }
            if (localStorage) {
                return localStorage.removeItem(key)
            }
            delete st[key]
        }
    }
})()
