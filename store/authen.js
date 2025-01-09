import { defineStore } from 'pinia'

export const useAuthenStore = defineStore('authen', {
    state: () => ({
        user: { username: '', password: '', mobile: '' },
        username: '',
        isAuth: false
    }),
    getters: {
        _isAuth: (state) => state.isAuth,
        _username: (state) => state.username
    },
    actions: {
        async register(payload) {
            // this.login(payload)
        },
        async login(payload) {
            const response = await $fetch('/api/auth/login', {
                method: 'post',
                body: { 
                    username: payload.username, 
                    password: payload.password
                }
            })
            
            if(response.result) {
                localStorage.setItem('auth', JSON.stringify({'username': payload.username}))
                this.username = payload.username
                this.isAuth = true
            }
            
        },
        async logout() {
            localStorage.removeItem("auth");
            this.isAuth = false
        },
        async isAuthen() {
            const is_auth = localStorage.getItem('auth')
            if(is_auth) {
                const user = JSON.parse(is_auth)
                this.username = user.username
                this.isAuth = true
            }
            else this.isAuth = false
        }
    }
})