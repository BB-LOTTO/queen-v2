import {NuxtAuthHandler} from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NuxtAuthHandler({
    secret: useRuntimeConfig().authSecret,

    pages: {
        signIn: '/login'
    },

    providers: [
        // @ts-expect-error
        CredentialsProvider.default({
            name: 'credentials',
            credentials: {},
            async authorize(credentials: { username: string, password: string }) {
                const baseURL = useRuntimeConfig().apiBase
                try {
                    const response = await $fetch('/auth/login', {
                        baseURL: baseURL,
                        method: 'POST',
                        headers: {
                            'Content-Type': "application/json"
                        },
                        body: {
                            username: credentials.username,
                            password: credentials.password
                        }
                    })

                    const user = { name: credentials.username }
            
                    return { 
                        ...user,
                        token: response
                    }
                } catch(error) {
                    throw createError({
                        statusCode: 401,
                        statusMessage: 'Unauthorized'
                    })
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if(user) {
                token = { ...token, ...user }
            }
            
            return token
        },

        async session({ session, token }) {
            session.user = {
                ...token,
                ...session.user
            }
            
            return session
        }
    },
    
})