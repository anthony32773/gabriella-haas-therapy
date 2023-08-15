<template>
  <h2
    class="text-h3 mb-4 font-weight-bold"
    :class="{ 'text-center': mdAndDown }">
    {{ header }}
  </h2>
</template>

<script setup lang="ts">
  import { useDisplay } from "vuetify/lib/framework.mjs";
  defineProps({
    header: {
      type: String,
      required: true,
    },
  });
  const { mdAndDown } = useDisplay();
</script>
