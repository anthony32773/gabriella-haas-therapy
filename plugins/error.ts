export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:error:cleared", async (options) => {
    const route = useRoute();
    if (route.path === options.redirect) {
      reloadNuxtApp();
    } else {
      await navigateTo(options.redirect);
    }
  });
});
