<template>
  <v-app>
    <div style="height: 100vh">
      <AppBar />
      <v-main>
        <v-container>
          <v-row class="d-flex justify-center">
            <v-col
              cols="12"
              sm="12"
              md="12"
              lg="6"
              xl="6"
              class="d-flex justify-center align-center flex-column">
              <h1 style="font-size: 100px">{{ error?.statusCode }}</h1>
              <h2 class="text-h2 mb-8 text-center">{{ error?.statusMessage }}</h2>
              <v-btn color="black" width="200px" @click="clearError({ redirect: '/' })"
                >Go Home</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script setup lang="ts">
  defineProps({
    error: {
      type: Object,
      default: () => {},
    },
  });
</script>

<style scoped>
  .error-background {
    background: rgb(64, 142, 255);
    background: radial-gradient(circle, rgba(64, 142, 255, 1) 0%, rgba(6, 30, 88, 1) 100%);
  }
</style>
