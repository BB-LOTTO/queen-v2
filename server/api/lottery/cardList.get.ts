import setHeader from "~/server/utils/header";

export default defineEventHandler(async(event) => {
    const _header = await setHeader(event)
    console.log(_header)

    try {
        const response:any = await $fetch('/queen/cardList', {
            baseURL: useRuntimeConfig().apiBase,
            headers: _header
        })

        return response
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Server Error.'
        })
    }
})