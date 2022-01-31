<template>
  <DragWindow title="标题" show="true">
    <template #top>
      <Icon icon="mdi:close-thick" height="20" style="cursor: pointer" />
      <!-- @click="show = false" -->
    </template>
  </DragWindow>
</template>

<script lang="ts" setup>
import DragWindow from '@/components/DragCard.vue'
</script>
