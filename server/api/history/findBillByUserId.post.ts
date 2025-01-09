import setHeader from "~/server/utils/header";

export default defineEventHandler(async(event) => {
    const _header = await setHeader(event)
    const body = await readBody(event)
    const setParam = `username=${body.username}&startDt=${body.startdate}&endDt=${body.enddate}&page=${body.page}&size=${body.size}`

    try {
        const response:any = await $fetch(`/history/findBillByUserId?${setParam}`, {
            baseURL: useRuntimeConfig().apiBase,
            headers: _header
        })

        return response
    } catch(error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Server Error.'
        })
    }
})