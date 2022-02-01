<template>
  <div class="container">
    <Container />
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
const Container = defineAsyncComponent(
  () => import('@/components/GraphCanvas.vue')
)
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
