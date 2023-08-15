<template>
  <div>
    <AdminContentEditor v-if="route.params.page === 'content'" />
    <AdminMessageViewer v-else-if="route.params.page === 'messages'" />
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: ["auth"],
    validate: (route) => {
      return route.params.page === "content" || route.params.page === "messages";
    },
  });
  const route = useRoute();
  const pageCopy = `${route.params.page}`;
  useHead({
    title: `Gabriella Haas - Admin Dashboard ${pageCopy
      .charAt(0)
      .toUpperCase()}${pageCopy.substring(1)}`
  });
  useServerSeoMeta({
    title: `Gabriella Haas - Admin Dashboard ${pageCopy
      .charAt(0)
      .toUpperCase()}${pageCopy.substring(1)}`,
    robots: {
      index: false,
      follow: false,
      noindex: true,
      nofollow: true,
      none: true,
      noarchive: false,
    },
  });
</script>
