<template>
  <v-app>
    <AppBar />
    <v-main>
      <Main />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Main from '@/views/Main.vue'
import AppBar from '@/components/AppBar.vue'
</script>
