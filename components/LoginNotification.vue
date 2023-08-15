<template>
  <v-card flat :width="width" variant="outlined" :color="colour" class="mb-4">
    <div class="d-flex justify-center pa-5">
      <v-icon class="mr-3 pb-2" icon="mdi:mdi-alert-outline" size="x-large" />
      <div class="d-flex flex-column justify-start">
        <h4 class="mb-3">There was a problem</h4>
        <span>{{ message }}</span>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  defineProps({
    message: {
      type: String,
      required: true,
    },
    colour: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
  });
</script>
