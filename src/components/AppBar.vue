<template>
  <v-app-bar density="compact">
    <img :src="routes[0].icon" @click="$router.push(routes[0].path)" />
    <v-app-bar-title>知智 · 图谱一体化构建工具</v-app-bar-title>

    <v-spacer />

    <v-btn
      :color="$router.currentRoute.value.name === btn.name ? 'primary' : ''"
      @click="$router.push(btn.path)"
      v-for="btn in btns"
      :key="btn.name"
    >
      <v-icon center :icon="btn.icon" />
      <span>{{ btn.name }}</span>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { routes } from '../plugins/vueRouter'

const btns = routes.filter((btn) => btn.name !== '首页')
</script>
