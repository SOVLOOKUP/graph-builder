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

<style>
.back {
  width: 100%;
  height: 100%;
  color: rgb(0, 0, 0);
  position: fixed;
  z-index: 99;
}
</style>
