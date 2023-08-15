<template>
    <div class="d-flex align-center justify-center h-100">
      <AppBarSiteName :resize="false" />
      <v-toolbar-items class="h-100">
        <v-btn
          v-for="page in PAGES"
          :key="page.link"
          color="white"
          style="font-size:x-large !important"
          :active="router.currentRoute.value.path === page.link"
          @click="navigateTo(page.link)"
          >{{ page.name }}</v-btn
        >
      </v-toolbar-items>
  </div>
</template>

<script setup lang="ts">
  import { PAGES } from "~/utils/pages";
  const router = useRouter();
</script>
