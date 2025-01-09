import setHeader from "~/server/utils/header";

export default defineEventHandler(async(event) => {
    const _header = await setHeader(event)
    const body = await readBody(event)

    try {
        const response = await $fetch('/payment/cancelWidthdrawal', {
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