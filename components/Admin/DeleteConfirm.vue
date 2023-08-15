<template>
  <v-dialog :model-value="activate" width="auto">
    <v-card>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions class="d-flex justify-space-between w-100">
        <v-btn width="40%" color="success" @click="$emit('confirm', true)">Yes?</v-btn>
        <v-btn width="40%" color="error" @click="$emit('confirm', false)">No?</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  defineProps({
    message: { type: String, required: true },
    activate: { type: Boolean, required: true },
  });
  defineEmits<{
    confirm: [value: boolean];
  }>();
</script>
