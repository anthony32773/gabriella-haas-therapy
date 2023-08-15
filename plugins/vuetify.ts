import "@fortawesome/fontawesome-free/css/all.css";
import { createVuetify } from "vuetify";
import { aliases, fa } from "vuetify/iconsets/fa";
import { mdi } from "vuetify/iconsets/mdi";
import { VInfiniteScroll, VSkeletonLoader, VDataTable } from "vuetify/lib/labs/components.mjs";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      VInfiniteScroll,
      VSkeletonLoader,
      VDataTable,
    },
    icons: {
      defaultSet: "fa",
      aliases,
      sets: {
        mdi,
        fa,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
