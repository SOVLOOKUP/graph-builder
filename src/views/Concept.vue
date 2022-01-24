<template>
  <Table
    itemName="概念"
    :columns="columns"
    :getItems="getItems"
    :deleteItem="removeConcepts"
    :createItem="createItem"
  >
    <!-- 多选 -->
    <q-select
      v-model="conceptTags"
      label="概念属性标签"
      multiple
      :options="options"
      :option-label="(opt) => opt.attributes.name"
      :loading="loading"
    >
      <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
        <q-item v-bind="itemProps">
          <q-item-section>
            <q-item-label v-html="opt.attributes.name" />
          </q-item-section>
        </q-item>
      </template>

      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> 无标签可用 </q-item-section>
        </q-item>
      </template>
    </q-select>
  </Table>
</template>
>

<script lang="ts" setup>
import Table from '@/components/Table.vue'
import { onMounted, ref } from 'vue'
import { listConcepts, removeConcepts, createConcept, listTags } from '../api'

onMounted(async () => {
  options.value = (await (await listTags()).json()).data
  loading.value = false
})

const conceptTags = ref()
const options = ref()
const loading = ref(true)
const createItem = async (name: string) => {
  await createConcept(
    name,
    (conceptTags.value as unknown as Array<any>).map((tag) => tag.id)
  )
}
const getItems = async () => (await (await listConcepts()).json()).data

const columns = [
  {
    align: 'center',
    name: 'id',
    label: '概念 ID',
    field: 'id',
  },
  {
    align: 'center',
    name: 'name',
    label: '概念名称',
    field: (item: any) => item.attributes.name,
  },
  {
    align: 'center',
    name: 'action',
    label: '操作',
  },
]
</script>
