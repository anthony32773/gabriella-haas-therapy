<template>
  <div>
    <PageTitle :title="page.PageTitle" />
    <v-divider class="my-4 divider" />
    <div v-for="(section, index) in page.Sections" :key="index">
      <SectionEntry :section="section" />
      <v-divider v-if="index !== page.Sections.length - 1" class="my-8 divider" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PageV2 } from "~/types/pageTypes";
  defineProps<{
    page: PageV2;
  }>();
</script>
