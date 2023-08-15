<template>
  <v-app-bar-title>
    <span v-if="resize" class="d-flex justify-center w-100">
      <span id="appbartitle" class="mr-10 header title" @click="navigateTo('/')">
        Gabriella Haas
      </span>
    </span>
    <span v-else id="appbartitle" class="header title" @click="navigateTo('/')">
      Gabriella Haas
    </span>
  </v-app-bar-title>
</template>

<script setup lang="ts">
  defineProps({
    resize: {
      type: Boolean,
      required: true,
    },
  });
</script>

<style scoped>
  #appbartitle:hover {
    cursor: pointer;
  }

  .title {
    color: white;
    font-size: 32px;
  }
</style>
