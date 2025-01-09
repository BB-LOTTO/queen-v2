import setHeader from "~/server/utils/header";

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    const _header = await setHeader(event)
    const setParam = `username=${body.username}&lotteryId=${body.lotteryId}&roundId=${body.roundId}`

    try{
        const response = await $fetch(`/queen/betRoundList?${setParam}`, {
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