<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated v-model="configStore.showBar">
      <q-toolbar>
        <q-toolbar-title style="cursor: pointer" @click="$router.push('/')">
          <q-avatar>
            <Icon icon="logos:graphene" width="30" />
          </q-avatar>
          <span class="font-family-body">GraphIntelligence</span>
        </q-toolbar-title>
        <q-space />

        <q-tabs shrink stretch>
          <q-route-tab
            style="width: 100px; height: 60px"
            :to="btn.path"
            v-for="btn in modeTab[configStore.mode]"
            :key="btn.name"
          >
            <Icon :icon="btn.icon" height="25" />
            {{ btn.name }}
          </q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container class="page">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <!-- <transition> -->
          <keep-alive>
            <suspense>
              <component :is="Component" />
              <template #fallback>
                <Loading />
              </template>
            </suspense>
          </keep-alive>
          <!-- </transition> -->
        </template>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useConfigStore } from './store'
import Loading from '@/components/Loading.vue'
const configStore = useConfigStore()

const modeTab: {
  [ModeName: string]: { name: string; path: string; icon: string }[]
} = {
  build: [
    {
      path: '/tagmanager',
      name: '标签',
      icon: 'mdi-tag',
    },
    {
      path: '/concept',
      name: '概念',
      icon: 'mdi-script-text-outline',
    },
    {
      path: '/datasource',
      name: '数据源',
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
  ],
  app: [
    {
      path: '/plugincenter',
      name: '插件市场',
      icon: 'mdi-chemical-weapon',
    },
  ],
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
