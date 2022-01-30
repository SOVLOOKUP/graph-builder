<template>
  <div class="ld">
    <q-circular-progress
      show-value
      font-size="10px"
      class="q-ma-md"
      :value="value"
      size="120px"
      :thickness="0.25"
      color="primary"
      track-color="grey-3"
    >
      <Icon :icon="ok ? 'flat-color-icons:ok' : 'logos:graphene'" width="60" />
    </q-circular-progress>
    <span style="font-size: 2em">应用装载中</span>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import ky from 'ky'
const fontName = import.meta.env.VITE_APP_FONT as string
const value = ref(0)
const ok = ref(false)
const done = inject('ok') as (font: FontFace) => void

onMounted(async () => {
  const res = await ky.get(`/${fontName}.ttf`, {
    onDownloadProgress: (e) => {
      value.value = (e.transferredBytes * 100) / 10080628
    },
  })
  const fontBuffer = await res.arrayBuffer()
  const font = await new FontFace(fontName, fontBuffer).load()
  ok.value = true
  done(font)
})
</script>

<style lang="scss" scoped>
.ld {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
}
</style>
