<template>
  <Table
    itemName="标签"
    :columns="columns"
    :getItems="getItems"
    :deleteItem="deleteTag"
    :createItem="createItem"
    :editItem="updateItem"
    @fillContent="(e:{ attributes: { description: string } }) => (newTagDescription = e.attributes.description)"
    @clearContent="newTagDescription = ''"
  >
    <q-input
      color="primary"
      v-model="newTagDescription"
      label="描述"
      autogrow
    />
  </Table>
</template>

<script lang="ts" setup>
import Table from '@/components/Table.vue'
import { ref } from 'vue'
import { listTags, deleteTag, createTag, updateTag } from '../api'

const getItems = async () => (await (await listTags()).json()).data
const createItem = async (name: string) => {
  await createTag(name, newTagDescription.value)
  newTagDescription.value = ''
}
const updateItem = async (id: number, name: string) =>
  updateTag(id, name, newTagDescription.value)

let newTagDescription = ref('')

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
    name: 'description',
    label: '描述',
    field: (item: any) => item.attributes.description,
  },
  {
    align: 'center',
    name: 'action',
    label: '操作',
  },
]
</script>
