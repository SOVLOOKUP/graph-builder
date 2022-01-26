<template>{{ info.map((i) => i.name).join('、') }}</template>
<script lang="ts" setup>
import { watch } from 'vue'
import { ref } from 'vue'
import { getTag } from '../api'

const props = defineProps<{
  tags: number[]
}>()

const refreshData = async () =>
  await Promise.all(
    props.tags.map(
      async (id: number) => (await (await getTag(id)).json()).data.attributes
    )
  )

watch(
  () => props.tags,
  async () => (info.value = await refreshData())
)

const info = ref(await refreshData())
</script>
