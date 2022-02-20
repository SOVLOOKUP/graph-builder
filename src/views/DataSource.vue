<template>
  <Table
    itemName="数据集"
    :columns="columns"
    :getItems="getItems"
    :deleteItem="deleteDataSource"
    :createItem="createItem"
    @clearContent="file = null; metaData = null"
  >
    <q-inner-loading
      :showing="loadingUpload"
      label="上传数据中..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />

    <q-file
      v-model="file"
      label="数据文件(xlsx)"
      clearable
      accept=".xlsx"
      counter
      variant="outlined"
      :loading="loading"
      @update:model-value="readFile"
      @clear="metaData = null"
    />

    <div v-show="metaData !== null">
      字段信息:
      <q-item v-for="item in metaData" style="text-align: center;">
        <q-item-section>{{ item.name }}</q-item-section>
        <q-item-section style="white-space: nowrap">{{ item.type }}</q-item-section>
      </q-item>
    </div>
  </Table>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import { listDataSources, deleteDataSource, createDataSource } from '../api'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import * as xlsx from 'xlsx'
import type { DataType, MetaData } from 'src/types'
const Table = defineAsyncComponent(() => import('@/components/Table.vue'))
const toast = useToast()
const getItems = async () => (await (await listDataSources()).json()).data

const createItem = async (name: string) => {
  if (metaData.value === null) {
    toast.info("请上传数据文件")
    return
  }
  loadingUpload.value = true
  await createDataSource(name, data, metaData.value)
  loadingUpload.value = false
  metaData.value = null
}

let data: object[] = []
const file = ref<File | null>(null)
const metaData = ref<MetaData[] | null>(null)
const loading = ref(false)
const loadingUpload = ref(false)
// const leftDrawerOpen = ref(true)

const readFile = async () => {
  if (file.value !== null) {
    // 开始读取
    loading.value = true
    const f = xlsx.read(await file.value.arrayBuffer())
    data = xlsx.utils.sheet_to_json(f.Sheets[f.SheetNames[0]])
    const colNames = Object.keys(data[0])
    const meta: MetaData[] = []
    colNames.forEach(name => {
      meta.push({
        name,
        type: typeof data[0][name] as DataType
      })
    })
    metaData.value = meta
    // 结束读取
    loading.value = false
  }
}

const columns = [
  {
    align: 'center',
    name: 'id',
    label: '数据集 ID',
    field: 'id',
  },
  {
    align: 'center',
    name: 'name',
    label: '数据集名称',
    field: (item: any) => item.attributes.name,
  },
  {
    align: 'center',
    name: 'metadata',
    label: '数据字段',
    field: (item: any) => item.attributes.metadata,
  },
  {
    align: 'center',
    name: 'action',
    label: '操作',
  },
]
</script>
