<template>
  <!-- todo 未登录状态下不显示 -->
  <v-app-bar density="compact" v-if="false">
    <img :src="routes[0].icon" @click="$router.push(routes[0].path)" />
    <v-app-bar-title>GraphIntelligence</v-app-bar-title>

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
