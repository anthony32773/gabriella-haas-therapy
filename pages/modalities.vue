<template>
  <SectionList :page="content!" />
</template>

<script setup lang="ts">
  import getData from "~/utils/getData";
  useServerSeoMeta({
    title: "Modalities, Methods, and Areas of Focus",
    ogTitle: "Modalities, Methods, and Areas of Focus",
    description: "Modalities, Methods, and Areas of Focus used by Gabriella Haas",
    ogDescription: "Modalities, Methods, and Areas of Focus used by Gabriella Haas",
  });
  useHead({ title: "Modalities, Methods, and Areas of Focus" });
  const { data: content } = await useAsyncData(() => getData("Modalities"));
</script>
