<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <div id="footerslot"></div>
  </v-app>
</template>

<script setup lang="ts">
  useHead({
    htmlAttrs: {
      lang: "en",
    },
  });
</script>
