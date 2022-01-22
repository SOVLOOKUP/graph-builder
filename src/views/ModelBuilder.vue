<template>
  <Container ref="childRef" />
  <div class="toolbar d-flex justify-center align-center">
    <v-btn class="mx-1" icon @click="fd"> <v-icon icon="mdi-plus" /></v-btn>
    <v-btn class="mx-1" icon @click="sx"> <v-icon icon="mdi-minus" /></v-btn>
    <v-btn class="mx-1" icon @click="rf">
      <v-icon icon="mdi-scan-helper"
    /></v-btn>
    <v-btn class="mx-1" icon @click="sv">
      <v-icon icon="mdi-content-save"
    /></v-btn>
  </div>
</template>

<script lang="ts" setup>
import Container from '@/components/GraphCanvas.vue'
import { notify } from '@kyvg/vue3-notification'
import { onBeforeMount, onMounted, ref } from 'vue'

const childRef = ref('childRef')
let c: any

onBeforeMount(async () => {})

onMounted(() => {
  c = childRef.value
})

// 放大
const fd = () => c.fd()
// 缩小
const sx = () => c.sx()
// 缩放到全屏
const rf = () => c.rf()
// 保存
const sv = async () => {
  const res = await c.sv()

  if (res.status === 200) {
    notify({
      type: 'success',
      title: '保存成功',
    })
  } else {
    notify({
      type: 'error',
      title: await res.json(),
    })
  }
}
</script>

<style>
.toolbar {
  position: fixed;
  bottom: 6px;
  left: 10px;
  right: 10px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid rgba(175, 175, 175, 0.767);
  background-color: rgb(243, 243, 243);
}
</style>
