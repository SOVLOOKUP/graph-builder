<template>
  <div class="ld" v-if="show">
    <q-circular-progress
      show-value
      font-size="10px"
      class="q-ma-md"
      :value="process"
      size="120px"
      :thickness="0.25"
      color="primary"
      track-color="grey-3"
    >
      <Icon :icon="process >= 100 ? 'flat-color-icons:ok' : 'logos:graphene'" width="60" />
    </q-circular-progress>
    <span style="font-size: 2em">应用装载中</span>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'

withDefaults(
  defineProps<{
    show: boolean
    process: number
  }>(),
  {
    show: false,
    process: 0
  }
)
</script>

<style lang="scss" scoped>
.ld {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 100vh;
  z-index: 9999;
  background-color: white;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
