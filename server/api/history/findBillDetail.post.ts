import setHeader from "~/server/utils/header";

export default defineEventHandler(async(event) => {
    const _header = await setHeader(event)
    const body = await readBody(event)
    const setParam = `billId=${body.bill}&page=${body.page}&size=${body.size}`

    try{
        const response:any = await $fetch(`/history/findBillDetailByBillId?${setParam}`, {
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