<template>
  <div v-if="dataLoaded">
    <SectionList :page="content" />
  </div>
</template>

<script setup lang="ts">
  import { PageV2 } from "types/pageTypes";
  import getData from "~/utils/getData";
  useServerSeoMeta({
    title: "Modalities, Methods, and Areas of Focus",
    ogTitle: "Modalities, Methods, and Areas of Focus",
    description: "Modalities, Methods, and Areas of Focus used by Gabriella Haas",
    ogDescription: "Modalities, Methods, and Areas of Focus used by Gabriella Haas",
  });
  useHead({ title: "Modalities, Methods, and Areas of Focus" });
  const dataLoaded = ref(false);
  let content: PageV2 = {
    PageTitle: "",
    PageKey: "Modalities",
    Sections: [],
  };
  onBeforeMount(async () => {
    content = await getData("Modalities");
    dataLoaded.value = true;
  });
</script>
