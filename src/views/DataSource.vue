<template>
  <Table
    itemName="数据源"
    :columns="columns"
    :getItems="getItems"
    :deleteItem="deleteDataSource"
    :createItem="createItem"
    @clearContent="file = null; metaData = null"
  >
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

    <!-- todo 优化元信息显示 -->
    <div v-show="metaData !== null">{{metaData}}</div>
  </Table>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import { listDataSources, deleteDataSource } from '../api'
import { ref } from 'vue'
import * as xlsx from 'xlsx'
const Table = defineAsyncComponent(() => import('@/components/Table.vue'))

const getItems = async () => (await (await listDataSources()).json()).data
// todo 上传Json
// todo 编辑
const createItem = async (name: string) => {
  // await createDataSource(name, newDSType.value)
  // newDSType.value = ''
}

const file = ref<File | null>(null)
const metaData = ref<MetaData[] | null>(null)
const loading = ref(false)

type ColType = "string" | "number" | "bigint" | "boolean"
interface MetaData { name: string; type: ColType }

const readFile = async () => {
  if (file.value !== null) {
    // 开始读取
    loading.value = true
    const f = xlsx.read(await file.value.arrayBuffer())
    const j:object[] = xlsx.utils.sheet_to_json(f.Sheets[f.SheetNames[0]])
    const colNames = Object.keys(j[0])
    const meta: MetaData[] = []
    colNames.forEach(name=>{
      meta.push({
        name,
        type: typeof j[0][name] as ColType
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
    name: 'metadata',
    label: '数据元信息',
    field: (item: any) => item.attributes.metadata,
  },
  {
    align: 'center',
    name: 'action',
    label: '操作',
  },
]
</script>
