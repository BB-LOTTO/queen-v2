export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        const response:any = await $fetch('/auth/login', {
            baseURL: useRuntimeConfig().apiBase,
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: body
        })

        console.log(response)

        const accessToken = response.access_token
        const refreshToken = response.refresh_token
        const user = { username: body.username }
        return { 
            token: {
                accessToken,
                refreshToken,
                user
            }
         }
    } catch(error) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }
})