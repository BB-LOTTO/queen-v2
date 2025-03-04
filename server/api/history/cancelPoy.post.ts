import setHeader from "~/server/utils/header";

export default defineEventHandler(async(event) => {
    const _header = await setHeader(event)
    const body = await readBody(event)

    try {
        const response:any = await $fetch('/queen/cancelPoy', {
            baseURL: useRuntimeConfig().apiBase,
            method: 'POST',
            headers: _header,
            body: body
        })

        return response
    } catch(error) {
        return error
    }
})