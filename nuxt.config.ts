// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    runtimeConfig: {
        backendUrl: process.env.BACKEND_URL, // private
        externalBackendUrl: process.env.EXTERNAL_BACKEND_URL,
        public: {
            backendUrl: process.env.BACKEND_URL,
            externalBackendUrl: process.env.EXTERNAL_BACKEND_URL,
        },
    },
  app: {
     head: {
         title: 'TP entropy',
     }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
       tailwindcss(),
      ],
  },
  modules: ['@nuxt/ui', '@nuxt/test-utils', 'nuxt-auth-utils']
})