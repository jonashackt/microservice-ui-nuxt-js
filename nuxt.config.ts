// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@element-plus/nuxt',
    '@nuxt/test-utils/module'
  ],

  elementPlus: { /** Options */ },

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:8098',
    }
  }
})
