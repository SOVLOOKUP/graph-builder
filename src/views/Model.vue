<template>
  <Table
    itemName="模型"
    :columns="columns"
    :getItems="getItems"
    :deleteItem="deleteModel"
    :createItem="createItem"
    :editItem="updateModel"
  >
    <template #edit="props">
      <q-btn flat @click="openModel(props.item.id)" label="建模" />
    </template>
  </Table>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import { listModels, deleteModel, createModel, updateModel } from '../api'
import { useRouter } from 'vue-router'
const Table = defineAsyncComponent(() => import('@/components/Table.vue'))
const router = useRouter()

const getItems = async () => (await (await listModels()).json()).data
const createItem = async (name: string) => await createModel(name)

const openModel = (id: string) => {
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
