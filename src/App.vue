<template>
  <v-app>
    <AppBar :show="!(store.state.user === null)" />
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
