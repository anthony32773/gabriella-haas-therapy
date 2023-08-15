<template>
  <div>
    <v-no-ssr>
      <v-app-bar app :border="true" elevation="0">
        <v-app-bar-nav-icon icon="mdi:mdi-menu" @click="adminDrawer = !adminDrawer" />
        <v-app-bar-title>Admin Dashboard - Gabriella Haas</v-app-bar-title>
      </v-app-bar>
      <v-navigation-drawer v-model="adminDrawer">
        <v-list nav @click:select="updateSelected($event.id as number)">
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :value="item.value"
            :prepend-icon="item.icon"
            :active="item.active"
            :title="item.title"
            active-color="blue" />
        </v-list>
        <template #append>
          <v-btn block color="blue" @click="logout">Logout</v-btn>
        </template>
      </v-navigation-drawer>
      <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>
      <v-snackbar v-model="snackBarStore.active" :timeout="5000" :color="snackBarStore.colour">
        {{ snackBarStore.message }}
        <template #actions>
          <v-btn color="white" variant="text" @click="snackBarStore.active = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </v-no-ssr>
  </div>
</template>

<script setup lang="ts">
  import { signOut } from "firebase/auth";
  import { useAdminSnackBarStore } from "~/stores/useAdminSnackBarStore";
  const snackBarStore = useAdminSnackBarStore();
  const adminDrawer = ref(false);
  type MenuItem = {
    title: string;
    icon: string;
    active: boolean;
    value: number;
    link: string;
  };
  const route = useRoute();

  const menuItems: MenuItem[] = [
    {
      title: "Content",
      icon: "mdi:mdi-table-of-contents",
      active: true,
      value: 0,
      link: "/admin/content",
    },
    {
      title: "Messages",
      icon: "mdi:mdi-email",
      active: false,
      value: 1,
      link: "/admin/messages",
    },
  ];

  const selectedItem = ref(0);

  onMounted(() => {
    for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i].link === `/admin/${route.params.page}`) {
        selectedItem.value = i;
        menuItems[selectedItem.value].active = true;
      } else {
        menuItems[i].active = false;
      }
    }
  });

  async function logout(): Promise<void> {
    try {
      await signOut(useFirebaseAuth()!);
      await navigateTo("/");
    } catch (err) {
      reloadNuxtApp();
    }
  }

  /**
   * Updates the active state of the account menu. Highlights the active account menu.
   * @param {number} item - The value property from the selected item
   * @returns {Promise<void>}
   */
  async function updateSelected(item: number): Promise<void> {
    if (item !== selectedItem.value) {
      menuItems[selectedItem.value].active = false;
      menuItems[item].active = true;
      selectedItem.value = item;
      await navigateTo(menuItems[item].link);
    }
  }
</script>
