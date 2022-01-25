<template>
  <div class="container">
    <Container ref="childRef" />
  </div>
  <div class="toolbar" align="center">
    <q-btn class="q-pa-md q-mx-xs" round @click="fd">
      <Icon icon="mdi-plus"
    /></q-btn>
    <q-btn class="q-pa-md q-mx-xs" round @click="sx">
      <Icon icon="mdi-minus"
    /></q-btn>
    <q-btn class="q-pa-md q-mx-xs" round @click="rf">
      <Icon icon="mdi-scan-helper"
    /></q-btn>
    <q-btn class="q-pa-md q-mx-xs" round @click="sv">
      <Icon icon="mdi-content-save"
    /></q-btn>
  </div>
</template>

<script lang="ts" setup>
import Container from '@/components/GraphCanvas.vue'
import { notify } from '@kyvg/vue3-notification'
import { onBeforeMount, onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'

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

.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
