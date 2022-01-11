<template>
  <v-container class="auth-card">
    <v-card class="mx-auto" min-width="450" :disabled="disabled" elevation="3">
      <v-progress-linear v-if="loading" indeterminate absolute />
      <div class="pa-10">
        <slot />
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
interface Props {
  loading?: Boolean
  disabled?: Boolean
}

withDefaults(defineProps<Props>(), {
  loading: () => false,
  disabled: () => false,
})
</script>

<style lang="scss">
.auth-card {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
