<template>
  <v-footer style="flex-grow: 0; flex-shrink: 0; flex-basis: 0" :border="true" elevation="0">
    <div class="d-flex justify-center align-center flex-column w-100">
      <p style="font-size: 28px" class="font-weight-bold header" @click="navigateTo('/')">
        Gabriella Haas - 2023
      </p>
      <span class="d-flex mt-2 justify-center align-center">
        <v-btn
          v-for="social in SOCIALS"
          style="font-size: medium;"
          :key="social.link"
          variant="text"
          :icon="social.icon"
          :href="social.link"
          :aria-label="social.ariaLabel"
          class="mr-2" />
        <PsychTodayButton />
      </span>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
  import { SOCIALS } from "~/utils/socials";
</script>

<style scoped>
  .header:hover {
    cursor: pointer;
  }
</style>
