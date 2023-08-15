<template>
  <div v-if="dataLoaded">
    <div v-once>
      <h1 class="text-center header">{{ content.PageTitle }}</h1>
      <h2 class="text-center mb-2 header">
        {{ content.SubTitle }}
      </h2>
      <span class="d-flex justify-center align-center w-100 mb-4 headshot">
        <v-avatar image="/images/headshot.avif" size="220" alt="Photo of Gabriella Haas" />
      </span>
      <SectionEntry
        v-for="(section, index) in content.Sections"
        :key="index"
        :section="section"
        class="about" />
    </div>
  </div>
  <div v-else>
    <v-skeleton-loader
      color="#436C89"
      class="mx-auto"
      elevation="12"
      type="heading, image, article, paragraph, paragraph, paragraph, paragraph" />
  </div>
</template>

<script setup lang="ts">
  import { PageV2 } from "types/pageTypes";

  useServerSeoMeta({
    title: "Gabriella Haas (She/Her)",
    ogTitle: "Gabriella Haas (She/Her)",
    description: "Counselling and psychotherapist services",
    ogDescription: "Counselling and psychotherapist services",
  });
  useHead({ title: "Gabriella Haas (She/Her)" });
  let content: PageV2 = {
    PageTitle: "",
    PageKey: "HomePage",
    Sections: [],
  };
  const dataLoaded = ref(false);
  onBeforeMount(async () => {
    content = await getData("Home Page");
    dataLoaded.value = true;
  });
</script>
<style scoped>
  @keyframes scale {
    100% {
      transform: scale(1);
    }
  }

  h1 {
    opacity: 0;
    filter: blur(4px);
    animation: 0.7s fade-in 0.1s forwards cubic-bezier(0.11, 0, 0.5, 0);
  }

  h2 {
    opacity: 0;
    filter: blur(4px);
    animation: 0.7s fade-in 0.4s forwards cubic-bezier(0.11, 0, 0.5, 0);
  }
  .headshot {
    opacity: 0;
    filter: blur(4px);
    animation: 0.7s fade-in 0.7s forwards cubic-bezier(0.11, 0, 0.5, 0);
  }

  .about {
    opacity: 0;
    filter: blur(4px);
    animation: 0.7s fade-in 1s forwards cubic-bezier(0.11, 0, 0.5, 0);
  }

  @keyframes fade-in {
    100% {
      opacity: 1;
      filter: blur(0);
    }
  }
</style>
