<template>
  <Table
    itemName="模型"
    :columns="columns"
    :getItems="getItems"
    :deleteItem="deleteModel"
    :createItem="createItem"
    :editItem="editItem"
  />
</template>

<script lang="ts" setup>
import Table from '@/components/Table.vue'
import { listModels, deleteModel, createModel } from '../api'
import { useRouter } from 'vue-router'
const router = useRouter()

const getItems = async () => (await (await listModels()).json()).data
const createItem = async (name: string) => await createModel(name)

const editItem = (id: string) => {
  window.open(router.resolve(`/model/${id}`).href)
}

const columns = [
  {
    align: 'center',
    name: 'id',
    label: '模型 ID',
    field: 'id',
  },
  {
    align: 'center',
    name: 'name',
    label: '模型名称',
    field: (item: any) => item.attributes.name,
  },
  {
    align: 'center',
    name: 'action',
    label: '操作',
  },
]
</script>
