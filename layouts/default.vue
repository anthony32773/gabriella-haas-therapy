<template>
  <v-main :class="{ main: enabledBackground[0] }">
    <AppBar />
    <v-container fluid>
      <v-row class="d-flex justify-center">
        <v-col
          xl="7"
          lg="9"
          md="12"
          sm="12"
          cols="12"
          :style="{ color: enabledBackground[1] as string }">
          <slot />
        </v-col>
      </v-row>
    </v-container>
    <Teleport to="#footerslot">
      <FooterBar />
    </Teleport>
  </v-main>
</template>

<script setup lang="ts">
  const router = useRouter();
  const enabledBackground = computed(() => {
    if (
      router.currentRoute.value.path === "/contact" ||
      router.currentRoute.value.path === "/login"
    ) {
      return [false, "black"];
    }
    return [true, "white"];
  });
</script>

<style scoped lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
  .main {
    background-image: url("/images/homepage-wavesv3.avif");
    background-size: auto;
    background-repeat: no-repeat;
    background-color: black;
  }
  :deep(.divider) {
    opacity: 1 !important;
  }
  :deep(.label) {
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 6px;
    display: inline-block;
    cursor: pointer;
  }
  :deep(.header) {
    font-family: "Bebas Neue", sans-serif;
  }
  :deep(.v-btn) {
    font-family: "Bebas Neue", sans-serif;
  }
  :deep(p) {
    font-family: "Bebas Neue", sans-serif !important;
    font-size: 26px;
  }

  :deep(li) {
    font-family: "Bebas Neue", sans-serif !important;
    font-size: 26px;
  }
  :deep(h1) {
    font-family: "Bebas Neue", sans-serif !important;
    line-height: 70px;
    font-size: 60px;
  }
  :deep(h2) {
    font-family: "Bebas Neue", sans-serif !important;
    font-weight: 700 !important;
    font-size: 32px;
  }
  :deep(h3) {
    font-family: "Bebas Neue", sans-serif !important;
  }
  :deep(.card-font) {
    font-family: "Bebas Neue", sans-serif !important;
  }
  :deep(.list-font) {
    font-family: "Bebas Neue", sans-serif !important;
  }
</style>
