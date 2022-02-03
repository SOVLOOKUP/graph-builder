<template>
  {{
    info
      .filter((i) => i?.status !== 'rejected')
      .map((i) => i.name)
      .join('、')
  }}
</template>
<script lang="ts" setup>
import { watch } from 'vue'
import { ref } from 'vue'
import { getTag } from '../api'

const props = defineProps<{
  tags: number[]
}>()

const getTagsInfo = async (tags: number[]) =>
  await Promise.allSettled(
    tags.map(
      async (id: number) => (await (await getTag(id)).json()).data.attributes
    )
  )

watch(
  () => props.tags,
  async (tags) => (info.value = await getTagsInfo(tags))
)

const defaultInfo = await getTagsInfo(props.tags)
const info = ref<any[]>(defaultInfo)
</script>
