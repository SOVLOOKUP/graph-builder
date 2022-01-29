<template>
  <Dialog v-model="dialog" title="设置" :ok="() => (dialog = false)">
    <q-input
      :label="'后端地址'"
      type="text"
      v-model="configStore.serverBaseUrl"
    />
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
import Dialog from '@/components/Dialog.vue'
import { useConfigStore } from '../../store'

const configStore = useConfigStore()
const loading = ref(false)
const dialog = ref(false)

const toggleLoading = (to?: boolean) => {
  if (to !== undefined) {
    loading.value = to
  } else {
    loading.value = !loading.value
  }
}
</script>

<style>
.setting {
  position: fixed;
  right: 10px;
  bottom: 10px;
}
</style>
