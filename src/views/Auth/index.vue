<template>
  <q-dialog
    v-model="dialog"
    persistent
    transition-show="flip-down"
    transition-hide="flip-up"
  >
    <q-card>
      <q-bar class="bg-primary text-white">
        <span>设置</span>

        <q-space />
      </q-bar>

      <q-card-section class="q-pt-none q-pa-md">
        <q-input
          :label="'后端地址'"
          type="text"
          v-model="serverBaseUrl"
          variant="outlined"
          hide-details="auto"
        />
        <slot />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat v-close-popup> 取消 </q-btn>
        <q-btn color="primary" flat v-close-popup @click="commitConfig">
          确认
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <Card :loading="loading">
    <router-view @toggleLoading="toggleLoading" />
  </Card>
  <q-btn flat round class="setting" @click="dialog = true">
    <Icon icon="icon-park-outline:setting-two" height="30" color="grey" />
  </q-btn>
</template>

<script lang="ts" setup>
import Card from '@/components/Card.vue'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useStore } from '../../store'

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
