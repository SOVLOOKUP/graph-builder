<template>
  <v-container class="auth-card">
    <v-card class="mx-auto" min-width="450" elevation="3">
      <v-progress-linear
        indeterminate
        absolute
        :color="loading ? '#673AB7' : 'success'"
      />

      <!-- logo -->
      <div class="pa-10">
        <div class="text-center mb-4">
          <span class="text-h6 text--secondary">
            <img
              :src="config.logoURL"
              alt="GraphIntelligence"
              width="24"
              style="vertical-align: middle"
              class="mr-1"
            />
            <span class="font-family-body">GraphIntelligence</span>
          </span>
        </div>

        <!-- form -->
        <slot />
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import config from '../../config'

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
