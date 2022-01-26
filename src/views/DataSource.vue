<template>
  <Table
    itemName="数据源"
    :columns="columns"
    :getItems="getItems"
    :deleteItem="deleteDataSource"
    :createItem="createItem"
  >
    <q-select v-model="newDSType" :options="tagType" label="数据源类型" />
  </Table>
</template>

<script lang="ts" setup>
import Table from '@/components/Table.vue'
import { listDataSources, deleteDataSource, createDataSource } from '../api'
import { ref } from 'vue'

const getItems = async () => (await (await listDataSources()).json()).data
// todo: meta,json
const createItem = async (name: string) => {
  await createDataSource(name, newDSType.value)
  newDSType.value = ''
}

const tagType = ['raw', 'nodes', 'edges']
const newDSType = ref('')

const columns = [
  {
    align: 'center',
    name: 'id',
    label: '数据源 ID',
    field: 'id',
  },
  {
    align: 'center',
    name: 'name',
    label: '数据源名称',
    field: (item: any) => item.attributes.name,
  },
  {
    align: 'center',
    name: 'type',
    label: '数据源类型',
    field: (item: any) => item.attributes.type,
  },
  {
    align: 'center',
    name: 'action',
    label: '操作',
  },
]
</script>
