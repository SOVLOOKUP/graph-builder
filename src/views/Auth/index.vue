<template>
  <AuthCard :loading="loading">
    <router-view @toggleLoading="toggleLoading" />
  </AuthCard>
</template>

<script lang="ts" setup>
import AuthCard from '@/components/Auth/AuthCard.vue'
import { ref } from 'vue'

const loading = ref(false)

const toggleLoading = () => {
  loading.value = !loading.value
}
</script>
