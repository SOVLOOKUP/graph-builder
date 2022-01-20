<template>
  <Card :loading="loading">
    <router-view @toggleLoading="toggleLoading" />
  </Card>
</template>

<script lang="ts" setup>
import Card from '@/components/Card.vue'
import { ref } from 'vue'

const loading = ref(false)

const toggleLoading = () => {
  loading.value = !loading.value
}
</script>
