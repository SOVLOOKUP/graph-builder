<template>
  <div class="ld" v-if="show">
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
import { onMounted, ref, defineProps, withDefaults } from 'vue'
import { Icon } from '@iconify/vue'
import ky from 'ky'
import { set } from 'idb-keyval'
const fontName = import.meta.env.VITE_APP_FONT as string
const value = ref(0)
const ok = ref(false)

withDefaults(
  defineProps<{
    show: boolean
  }>(),
  {
    show: false,
  }
)

const emits = defineEmits<{
  (e: 'ok'): void
}>()

const loadFont = async () => {
  const res = await ky.get(`/${fontName}.ttf`, {
    onDownloadProgress: (e) => {
      value.value = (e.transferredBytes * 100) / 10080628
    },
  })
  const fontBuffer = await res.arrayBuffer()
  const font = await new FontFace(fontName, fontBuffer).load()
  ;(document.fonts as any).add(font)
  document.body.style.fontFamily = fontName
  await set('font', fontBuffer)
}

onMounted(async () => {
  await loadFont()
  ok.value = true
  emits('ok')
})
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
