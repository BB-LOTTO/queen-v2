import setHeader from "~/server/utils/header";

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    const _header = await setHeader(event)

    try {
        const response:any = await $fetch('/queen/round', {
            baseURL: useRuntimeConfig().apiBase,
            method: 'POST',
            headers: _header,
            body: body
        })

        return response
    } catch(error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Server Error.'
        })
    }
})