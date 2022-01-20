<template>
  <v-app>
    <AppBar
      :show="
        !(store.state.user === null) &&
        !$router.currentRoute.value.fullPath.startsWith('/model/')
      "
    />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import { useStore } from './store'
const store = useStore()
</script>
