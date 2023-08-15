<template>
  <v-navigation-drawer v-model="drawer.active" temporary location="top" color="black">
    <v-list v-if="drawer.active" nav>
      <v-list-item
        v-for="page in PAGES"
        v-show="drawer.active"
        :key="page.link"
        height="72px"
        class="w-100 d-flex justify-center list-item text-body-1 list-font"
        @click="navigateTo(page.link)"
        ><span style="font-size: 30px">{{ page.name }}</span>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { useDrawerStore } from "~/stores/useDrawerStore";
  import { PAGES } from "~/utils/pages";
  const drawer = useDrawerStore();
</script>

<style scoped>
  @keyframes scale {
    100% {
      transform: scale(1);
    }
  }

  .list-item {
    opacity: 0;
    filter: blur(4px);
  }

  .list-item:nth-child(1) {
    animation: 0.5s fade-in 0.1s forwards cubic-bezier(0.11, 0, 0.5, 0);
  }

  .list-item:nth-child(2) {
    animation: 0.5s fade-in 0.3s forwards cubic-bezier(0.11, 0, 0.5, 0);
  }

  .list-item:nth-child(3) {
    animation: 0.5s fade-in 0.5s forwards cubic-bezier(0.11, 0, 0.5, 0);
  }

  .list-item:nth-child(4) {
    animation: 0.5s fade-in 0.5s forwards cubic-bezier(0.11, 0, 0.5, 0);
  }

  @keyframes fade-in {
    100% {
      opacity: 1;
      filter: blur(0);
    }
  }
</style>
