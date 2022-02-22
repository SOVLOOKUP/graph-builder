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
          <suspense timeout="0">
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
  <FirstLoading :show="show" :process="process" />
</template>

<script setup lang="ts">
import { useConfigStore } from './store'
import Loading from '@/components/Loading.vue'
import FirstLoading from '@/components/FirstLoading.vue'
import ky from 'ky'
import { onBeforeMount, ref } from 'vue'
import { get, set } from 'idb-keyval'
const fontName = import.meta.env.VITE_APP_FONT as string

const configStore = useConfigStore()
const show = ref(false)
const process = ref(0)

const loadFont = async () => {
  // 加载字体
  const res = await ky.get(`/${fontName}.ttf`, {
    onDownloadProgress: (e) => {
      process.value = (e.transferredBytes * 100) / 10080628
    },
  })
  const fontBuffer = await res.arrayBuffer()
  // 设置本地储存
  await set(fontName, fontBuffer)
  return fontBuffer
}

// 这里检测 indexeddb 资源是否存在，如果不存在，则启动首屏加载
onBeforeMount(async () => {
  let fontBuffer = await get(fontName)
  // 如果资源不存在就下载
  if (fontBuffer === undefined) {
    // 打开 loading
    show.value = true
    // 下载资源
    fontBuffer = await loadFont()
    // 关闭 loading
    show.value = false
  }

  // 加载字体
  const font = new FontFace(fontName, fontBuffer)
  await font.load()
    ; (document.fonts as any).add(font)
  document.body.style.fontFamily = fontName
})

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
      path: '/tasks',
      name: '任务流',
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
