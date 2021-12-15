<template>
  <v-app-bar density="compact">
    <v-app-bar-title>知智</v-app-bar-title>

    <v-spacer />

    <v-divider inset vertical></v-divider>

    <v-btn class="mr-4 ml-5" color="primary" plain>
      <v-icon left icon="mdi-handshake-outline"></v-icon>

      <span>John Leider</span>
    </v-btn>
  </v-app-bar>

  <div class="home">
    <img alt="Vue logo" src="/favicon.ico" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App!!!" />
  </div>
</template>

<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue'
</script>
