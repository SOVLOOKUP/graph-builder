<template>
  <v-app>
    <!-- todo 根据有无登录判断 -->
    <AppBar :show="true" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
</script>
