export default defineEventHandler(async(event) => {
    const body = await readBody(event)

    try{
        const response:any = await $fetch('/commons/user/register', {
            baseURL: useRuntimeConfig().apiBase,
            method: 'POST',
            body: body
        })

        return response
    } catch(error) {
        throw createError({
            statusCode: 500,
            statusMessage: `${error}`
        })
    }
})