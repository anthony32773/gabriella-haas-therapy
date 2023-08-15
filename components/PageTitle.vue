<template>
  <h1 class="text-h2 font-weight-bold" :class="{ 'text-center': mdAndDown }">
    {{ title }}
  </h1>
</template>

<script setup lang="ts">
  import { useDisplay } from "vuetify/lib/framework.mjs";
  defineProps({
    title: {
        type: String,
        required: true
    }
  });
  const { mdAndDown } = useDisplay();
</script>
