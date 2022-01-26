<template>
  <q-dialog transition-show="flip-down" transition-hide="flip-up">
    <q-card>
      <q-bar class="bg-primary text-white">
        <span>{{ title }}</span>
        <q-space />
      </q-bar>

      <q-card-section class="q-pt-none q-pa-md">
        <slot name="default" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat v-close-popup> 取消 </q-btn>
        <q-btn color="primary" flat @click="ok" v-close-popup> 确认 </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
defineProps<{
  title?: string
  ok?: (evt: any, navigateFn: () => void) => void
}>()
</script>
