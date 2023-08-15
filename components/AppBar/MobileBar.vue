<template>
  <div class="d-flex h-100 w-100 justify-center align-center">
    <v-app-bar-nav-icon icon="mdi:mdi-menu" @click="drawer.active = !drawer.active" />
    <AppBarSiteName :resize="true" />
  </div>
</template>

<script setup lang="ts">
import { useDrawerStore } from '~/stores/useDrawerStore';

const drawer = useDrawerStore();
</script>
