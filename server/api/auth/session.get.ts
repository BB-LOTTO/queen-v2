import setHeader from '~/server/utils/header'

export default defineEventHandler(async(event) => {
    const _header = await setHeader(event)

    try {
        const response:any = await $fetch('/auth/user', {
            baseURL: useRuntimeConfig().apiBase,
            headers: _header
        })

        return response
    } catch(error) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }
})