<template>
  <v-app-bar density="compact" v-if="show">
    <img :src="config.logoURL" />
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
import config from '../config'

const btns = [
  {
    path: '/project',
    name: '项目',
    icon: 'mdi-google-ads',
  },
  {
    path: '/datasource',
    name: '数据',
    icon: 'mdi-database',
  },
  {
    path: '/tagmanager',
    name: '标签',
    icon: 'mdi-tag',
  },
  {
    path: '/graphbuilder',
    name: '构建',
    icon: 'mdi-crane',
  },
]

withDefaults(
  defineProps<{
    show?: boolean
  }>(),
  {
    show: false,
  }
)
</script>
