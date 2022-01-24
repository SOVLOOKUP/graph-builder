<template>
  <div class="c">
    <div class="out-card">
      <q-card class="auth-card">
        <q-linear-progress indeterminate v-if="loading" />
        <div class="q-pa-xl">
          <q-toolbar-title class="q-py-lg">
            <q-avatar>
              <Icon icon="logos:graphene" width="30" />
            </q-avatar>
            <span class="font-family-body">GraphIntelligence</span>
          </q-toolbar-title>

          <!-- form -->
          <slot />
        </div>
      </q-card>
    </div>
  </div>
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
.c {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .out-card {
    width: 400px;
    margin: auto;
    text-align: center;
    padding: auto;
    vertical-align: middle;
    left: 0;
    right: 0;
    display: flex;

    .auth-card {
      width: 100%;
    }
  }
}
</style>
