const _auth = localStorage.getItem('auth') ?? false

export default defineNuxtRouteMiddleware(async(to, from,) => {
    // console.log(to)
    if(!_auth && to.path === '/lottery/bet') {
        return navigateTo('/login')
    }
    // return navigateTo('/login')
})