<template>
  <Table
    itemName="标签"
    :columns="columns"
    :getItems="getItems"
    :deleteItem="deleteTag"
    :createItem="createItem"
    :editItem="updateItem"
    @fillContent="(e:{ attributes: { type: string } }) => (newTagType = e.attributes.type)"
    @clearContent="newTagType = ''"
  >
    <q-select v-model="newTagType" :options="tagType" label="标签类型" />
  </Table>
</template>

<script lang="ts" setup>
import Table from '@/components/Table.vue'
import { onMounted, Ref, ref } from 'vue'
import { listTags, deleteTag, createTag, updateTag, getTagType } from '../api'

const getItems = async () => (await (await listTags()).json()).data
const createItem = async (name: string) => {
  await createTag(name, newTagType.value)
  newTagType.value = ''
}
const updateItem = async (id: number, name: string) =>
  updateTag(id, name, newTagType.value)

onMounted(async () => {
  tagType.value = (
    await (await getTagType()).json()
  ).data.schema.attributes.type.enum
})

let tagType: Ref<string[]> = ref([])
let newTagType = ref('')

const columns = [
  {
    align: 'center',
    name: 'id',
    label: '标签 ID',
    field: 'id',
  },
  {
    align: 'center',
    name: 'name',
    label: '标签名称',
    field: (item: any) => item.attributes.name,
  },
  {
    align: 'center',
    name: 'type',
    label: '类型',
    field: (item: any) => item.attributes.type,
  },
  {
    align: 'center',
    name: 'action',
    label: '操作',
  },
]
</script>
