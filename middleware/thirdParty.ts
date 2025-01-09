export default defineNuxtRouteMiddleware(async(to, from) => {
    const _token = from.query.token || ''
    if(_token !== '') {
        
        const response:any = await $fetch('/api/auth/tpUser', {
            method: 'POST',
            body: { 'token': from.query.token }
        })

        if(response) {
            const token = useCookie<any>('auth.token', {
                sameSite: 'strict',
                maxAge: 24*60*60,
            })

            token.value = from.query.token

            setTimeout(() => {
                reloadNuxtApp({
                    path: "/dashboard/profile",
                    ttl: 2000, // default 10000
                })
            }, 2000)
        }
        else return navigateTo('/expired')
    }
    else {
        return navigateTo('/expired')
    }
})