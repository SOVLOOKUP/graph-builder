<template>
  <div>
    <div class="text-center mb-4">
      <span class="text-h6 text--secondary">
        <img
          src="https://gw.alipayobjects.com/zos/antfincdn/0b4HzOcEJY/Graphin.svg"
          alt="GraphIntelligence"
          width="24"
          style="vertical-align: middle"
          class="mr-1"
        />
        <span class="font-family-body">GraphIntelligence</span>
      </span>
    </div>
    <div class="transition-wrapper">
      <transition :name="transitionName">
        <router-view @next="$emit('next', $event)" />
      </transition>
    </div>
  </div>
</template>

<!-- <script lang="ts">
export default defineComponent({
  watch: {
    $route(to) {
      this.transitionName =
        to.name === 'password' ? 'slide-left' : 'slide-right'
    },
  },
})
</script> -->

<script lang="ts" setup>
import { ref, watch } from 'vue'

const transitionName = ref('slide-left')
</script>

<style lang="scss">
.transition-wrapper {
  position: relative;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
}
.slide-left-enter,
.slide-right-leave-to {
  transform: translateX(500px);
}
.slide-left-leave-to,
.slide-right-enter {
  transform: translateX(-500px);
}
</style>
