<template>
  <v-app>
    <notifications position="bottom right" />
    <AppBar
      :show="
        !(store.state.user === null) &&
        !$router.currentRoute.value.fullPath.startsWith('/model/')
      "
    />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import { useStore } from './store'
const store = useStore()
</script>

<style lang="scss">
.vue-notification {
  // // styling
  // margin: 0 5px 5px;
  // padding: 10px;
  // font-size: 12px;
  // color: #ffffff;

  // default (blue)
  background: #44a4fc;
  border-left: 5px solid #187fe7;

  // types (green, amber, red)
  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  }

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }
}
</style>
