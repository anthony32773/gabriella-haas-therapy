<template>
  <div v-if="dataLoaded">
    <SectionList :page="content" />
  </div>
</template>

<script setup lang="ts">
  import { PageV2 } from "types/pageTypes";
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
  const dataLoaded = ref(false);
  let content: PageV2 = {
    PageTitle: "",
    PageKey: "Services",
    Sections: [],
  };
  onBeforeMount(async () => {
    content = await getData("Services");
    dataLoaded.value = true;
  });
</script>
