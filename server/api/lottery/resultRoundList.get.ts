import setHeader from "~/server/utils/header";

export default defineEventHandler(async(event) => {
    const _header = await setHeader(event)
    const query = getQuery(event)

    try {
        const response:any = await $fetch(`/queen/resultRoundList?lotteryId=${query.lotteryId}&roundId=${query.roundId}`, {
            baseURL: useRuntimeConfig().apiBase,
            headers: _header
        })

        return response
    } catch(err) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Server Error.'
        })
    }

})