// https://nuxt.com/docs/api/configuration/nuxt-config
import esLintPlugin from "vite-plugin-eslint";
import vuetify from "vite-plugin-vuetify";
export default defineNuxtConfig({
  routeRules: {
    "/": { swr: true },
    "/services": { swr: true },
    "/modalities": { swr: true },
    "/contact": { swr: true },
    "/login": { ssr: false },
    "/admin/**": { ssr: false },
  },
  css: ["vuetify/lib/styles/main.sass", "@mdi/font/css/materialdesignicons.min.css"],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    plugins: [esLintPlugin()],
  },
  modules: [
    "nuxt-vuefire",
    "@pinia/nuxt",
    "nuxt-gtag",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        // @ts-ignore
        config.plugins.push(vuetify())
      );
    },
  ],
  gtag: {
    id: process.env.GTAG_ID as string,
  },
  pinia: {
    autoImports: ["defineStore"],
  },
  components: [{ path: "~/components/AppBar", prefix: "AppBar" }, "~/components"],
  vuefire: {
    auth: true,
    appCheck: {
      debug: process.env.NODE_ENV !== "production",
      isTokenAutoRefreshEnabled: true,
      provider: "ReCaptchaV3",
      key: process.env.APP_CHECK_SITE_KEY as string,
    },
    config: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    },
    emulators: false,
  },
  nitro: {
    preset: "firebase",
  },
});
