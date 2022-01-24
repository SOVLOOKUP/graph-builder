<template>
  <v-container class="auth-card">
    <v-card class="mx-auto" min-width="450" elevation="3">
      <v-progress-linear
        indeterminate
        absolute
        v-show="loading"
        color="#673AB7"
      />

      <div class="pa-10">
        <q-toolbar-title>
          <q-avatar>
            <Icon icon="logos:graphene" width="30" />
          </q-avatar>
          <span class="font-family-body">GraphIntelligence</span>
        </q-toolbar-title>

        <!-- form -->
        <slot />
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
withDefaults(
  defineProps<{
    loading?: boolean
  }>(),
  {
    loading: false,
  }
)
</script>

<style lang="scss">
.auth-card {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
