export default defineEventHandler(async(event) => {
    try{
        const response:any = await $fetch('/commons/bank/findAll', {
            baseURL: useRuntimeConfig().apiBase
        })

        return response
    } catch(error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Servert Error.'
        })
    }
})