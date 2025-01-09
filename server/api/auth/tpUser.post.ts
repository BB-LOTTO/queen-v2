export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    const _header = {
        'Authorization': `Bearer ${body.token}`,
        'Content-Type': "application/json"
    }

    try {
        const response:any = await $fetch('/auth/user', {
            baseURL: useRuntimeConfig().apiBase,
            headers: _header
        })

        if(response.status === 'OK') return true
    } catch(error) {
        return false
        // throw createError({
        //     statusCode: 401,
        //     statusMessage: 'Unauthorized'
        // })
    }
})