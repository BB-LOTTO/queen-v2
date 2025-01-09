export default async function setHeader(event) {
    const cookies = parseCookies(event)
    const TOKEN_TYPE = 'Bearer'
    const TOKEN = cookies['auth.token']

    const header = {
        'Authorization': `${TOKEN_TYPE} ${TOKEN}`,
        'Content-Type': "application/json"
    }

    return header
}