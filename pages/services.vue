<template>
  <SectionList :page="content!" />
</template>

<script setup lang="ts">
  import getData from "~/utils/getData";
  useServerSeoMeta({
    title: "Services",
    ogTitle: "Services",
    description: "Therapy services offered by Gabriella Haas",
    ogDescription: "Therapy services offered by Gabriella Haas",
  });
  useHead({
    title: "Services",
  });
  const { data: content } = await useAsyncData(() => getData("Services"));
</script>
