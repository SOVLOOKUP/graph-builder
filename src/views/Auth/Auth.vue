<template>
  <LoginCard :loading="loading" :disabled="disabled">
    <router-view @next="onNext" />
  </LoginCard>
</template>

<script lang="ts" setup>
import LoginCard from '@/components/LoginCard/LoginCard.vue'

import { ref } from 'vue'

const loading = ref(false)
const disabled = ref(false)

const onNext = (data: any) => {
  loading.value = true
  disabled.value = true
  setTimeout(() => {
    loading.value = false
    disabled.value = false
    // router.push({ name: 'password' })
  }, 1000)
}
</script>
