<template>
  <div class="c">
    <div class="out-card">
      <q-card class="auth-card">
        <transition name="fade">
          <q-linear-progress indeterminate v-show="loading" />
        </transition>
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
withDefaults(
  defineProps<{
    loading?: boolean
  }>(),
  {
    loading: false,
  }
)
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.c {
  display: flex;
  justify-content: center;
  align-items: center;

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
