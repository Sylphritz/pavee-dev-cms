// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  routeRules: {
    '/api/**': { cors: true },
  },
  modules: ['@pinia/nuxt'],
  pinia: {
    autoImports: ['defineStore'],
  },
  test: true,
  runtimeConfig: {
    s3Endpoint: '',
    s3AccountId: '',
    s3CloudFlareToken: '',
    s3AccessKey: '',
    s3SecretKey: '',
    s3Bucket: '',
    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY || '',
      firebaseAuthDomain: '',
      firebaseProjectId: '',
      firebaseAppId: '',
      firebaseMeasurementId: '',
    },
  },
})
