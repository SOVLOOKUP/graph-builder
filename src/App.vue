<template>
  <notifications position="bottom right" />

  <q-layout view="hHh lpR fFf">
    <q-header elevated v-model="store.state.showBar">
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
            style="width: 100px"
            :to="btn.path"
            v-for="btn in btns"
            :key="btn.name"
          >
            <Icon :icon="btn.icon" height="25" />
            {{ btn.name }}
          </q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from './store'

const router = useRouter()
const store = useStore()
onBeforeMount(async () => await store.dispatch('autoHideBar', router))

const btns = [
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
</script>
