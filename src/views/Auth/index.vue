<template>
  <!-- todo 背景 -->
  <!-- <div ref="vantaRef" class="back" /> -->
  <AuthCard :loading="loading">
    <router-view @toggleLoading="toggleLoading" />
  </AuthCard>
</template>

<script lang="ts" setup>
import AuthCard from '@/components/Auth/AuthCard.vue'
import { onMounted, ref } from 'vue'

const loading = ref(false)
const vantaRef = ref(null)

const toggleLoading = () => {
  loading.value = !loading.value
}

// onMounted(() => {
//   vanta.NET({
//     el: vantaRef.value,
//     mouseControls: true,
//     touchControls: true,
//     gyroControls: false,
//     minHeight: 200.0,
//     minWidth: 200.0,
//     scale: 1.0,
//     scaleMobile: 1.0,
//   })
// })
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
