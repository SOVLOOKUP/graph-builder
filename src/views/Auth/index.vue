<template>
  <Dialog v-model="dialog" title="设置" :ok="commitConfig">
    <q-input :label="'后端地址'" type="text" v-model="serverBaseUrl" />
  </Dialog>

  <Card :loading="loading">
    <router-view @toggleLoading="toggleLoading" />
  </Card>
  <div class="setting">
    <q-btn flat round @click="dialog = true">
      <Icon icon="icon-park-outline:setting-two" height="30" color="grey" />
    </q-btn>
    <q-btn flat round>
      <q-tooltip> 微信: xiafanGO-NORTH </q-tooltip>
      <Icon icon="topcoat:question" height="30" color="grey"> </Icon>
    </q-btn>
  </div>
</template>

<script lang="ts" setup>
import Card from '@/components/Card.vue'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useStore } from '../../store'
import Dialog from '@/components/Dialog.vue'

const store = useStore()
const loading = ref(false)
const dialog = ref(false)
const serverBaseUrl = ref(store.state.serverBaseUrl)

const toggleLoading = () => {
  loading.value = !loading.value
}

const commitConfig = () =>
  store.commit('updateServerBaseUrl', serverBaseUrl.value)
</script>

<style>
.setting {
  position: fixed;
  right: 10px;
  bottom: 10px;
}
</style>
