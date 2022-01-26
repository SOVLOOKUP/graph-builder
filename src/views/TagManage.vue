<template>
  <Table
    itemName="标签"
    :columns="columns"
    :getItems="getItems"
    :deleteItem="deleteTag"
    :createItem="createItem"
    :editItem="updateItem"
  >
    <q-select v-model="newTagType" :options="tagType" label="标签类型" />
  </Table>
</template>

<script lang="ts" setup>
import Table from '@/components/Table.vue'
import { ref } from 'vue'
import { listTags, deleteTag, createTag, updateTag } from '../api'

const getItems = async () => (await (await listTags()).json()).data
const createItem = async (name: string) => {
  await createTag(name, newTagType.value)
  newTagType.value = ''
}
const updateItem = async (id: number, name: string) =>
  updateTag(id, name, newTagType.value)

const tagType = ['string', 'number', 'bool', 'timestamp']
const newTagType = ref('')

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
