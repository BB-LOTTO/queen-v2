export const useBalance = async(username:string) => {
    try {
        const res:any = await $fetch('/api/balance/getBalance', {
            query: {
                "user" : username
            }
        })

        return res.status === 'OK' ? res.balance : 0
    } catch(error) {
        console.log(error)
    }
}