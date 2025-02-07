import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

const WEB_NAME = "หวยออนไลน์ ครบวงจร อัตราสูง | Lotto Queen"
const DESCRIPTION = "เว็บหวยออนไลน์ ครบวงจรหวยยอดนิยม นอกจากนี้เรายังเป็น แหล่งรวมเกมชั้นนำ คัดสรรมาเพื่อนักเดิมพันโดยเฉพาะ มองหาเกมเดิมพันหรือเกมต้องที่นี่เท่านั้น"

export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: WEB_NAME,
      meta: [
        { name: 'description', content: DESCRIPTION }
      ]
    }
  },
  components: {
    global: true,
    dirs: ['~/components']
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    ['@nuxtjs/google-fonts',{
      families: {
        Mitr: {
          wght: [300, 500, 700],
          ital: [100]
        },
      }
    }],
  ],
  plugins: [
    '~/plugins/format'
  ],
  auth: {
    globalAppMiddleware: false,
    //baseURL: '/api/auth',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/session', method: 'get' }
      },
      pages: {
        login: '/expired'
      },
      token: { 
        signInResponseTokenPointer: '/token/accessToken',
        sameSiteAttribute: 'strict',
        maxAgeInSeconds: 24*60*60,
      },
    }
  },
  // auth: {
  //   baseURL: process.env.AUTH_ORIGIN,
  //   provider: {
  //     type: 'authjs'
  //   }
  // },
  css: ['@/assets/css/style.css'],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    // token: process.env.TOKEN,
    // key: process.env.KEY,
    // Keys within public, will be also exposed to the client-side
    public: {
      webName: WEB_NAME
    },
    apiBase: process.env.API_ENDPOINT,
    authSecret: process.env.AUTH_SECRET
  }
})
