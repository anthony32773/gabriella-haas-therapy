<template>
  <div>
    <v-app-bar app floating flat color="black">
      <v-row class="d-flex justify-center h-100 ma-0">
        <v-col
          cols="12"
          md="12"
          sm="12"
          lg="9"
          xl="9"
          class="py-0">
          <AppBarMobileBar v-if="mdAndDown" />
          <AppBarDesktopBar v-else />
        </v-col>
      </v-row>
    </v-app-bar>
    <AppBarNavDrawer v-if="mdAndDown" />
  </div>
</template>

<script setup lang="ts">
  import { useDisplay } from "vuetify/lib/framework.mjs";

  const { mdAndDown } = useDisplay();
</script>
