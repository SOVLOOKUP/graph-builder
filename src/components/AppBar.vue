<template>
  <v-app-bar density="compact" v-if="show">
    <v-app-bar-title>
      <div class="text-center mb-2">
        <span
          class="text-h6 text--secondary"
          style="cursor: pointer"
          @click="$router.push('/')"
        >
          <img
            :src="config.logoURL"
            alt="GraphIntelligence"
            width="30"
            style="vertical-align: middle"
            class="mr-1"
          />
          <span class="font-family-body">GraphIntelligence</span>
        </span>
      </div>
    </v-app-bar-title>

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
    path: '/tagmanager',
    name: '标签',
    icon: 'mdi-tag',
  },
  {
    path: '/datasource',
    name: '数据',
    icon: 'mdi-database',
  },
  {
    path: '/model',
    name: '模型',
    icon: 'mdi-electron-framework',
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
