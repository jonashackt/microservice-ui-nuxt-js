export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'microservice-ui-nuxt-js',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios.ts'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    // proxy all webpack dev-server requests starting with /api
    // to our Spring Boot backend (localhost:8098) using http-proxy-middleware
    // see https://cli.vuejs.org/config/#devserver-proxy
    extend(config, { isDev }) {
      // Sets webpack's mode to development if `isDev` is true.
      if (isDev) {
        config.mode = 'development';
        // Proxy /api to microservice-api-spring-boot Spring Boot backend only in dev
        const devServer = {
          proxy: {
            '/api': {
              target: 'http://localhost:8098', // this configuration needs to correspond to the Spring Boot backends' application.properties server.port
              ws: true,
              changeOrigin: true
            }
          }
        }
        config.devServer = devServer;
      }
    }
  },

  // see https://composition-api.nuxtjs.org/getting-started/setup &
  // https://github.com/nuxt-community/composition-api/issues/44
  generate: {
    // choose to suit your project
    interval: 2000,
  }

}
