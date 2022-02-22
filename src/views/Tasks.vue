<template>
  <q-dialog persistent full-height full-width v-model="dialog">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>数据字段匹配</q-toolbar-title>
          <q-chip v-show="cells !== null">{{ cells?.length }} 个集合需要匹配数据源</q-chip>
          <q-btn flat round dense @click="dialog = false; model = null; cells = null">
            <Icon icon="mdi:close" />
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-inner-loading
          :showing="dialogLoading"
          label="模型加载中..."
          label-class="text-teal"
          label-style="font-size: 1.1em"
        />
        <q-page padding>
          <DataMapper :cells="cells" :dataCollectionOptions="dataCollectionOptions" @done="done" />
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>

  <Table
    itemName="任务流"
    :createItem="createItem"
    :columns="columns"
    :getItems="getItems"
    :deleteItem="deleteTask"
    @clearContent="model = null; newTaskDescription = ''"
  >
    <q-input color="primary" v-model="newTaskDescription" label="描述" autogrow />
    <q-select
      v-model="model"
      :options="options"
      label="本体模型"
      :option-label="(opt) => opt?.attributes.name"
      @update:model-value="selectedModel"
    >
      <template v-slot:option="{ itemProps, opt }">
        <q-item v-bind="itemProps">
          <q-item-section>
            <q-item-label v-html="opt.attributes.name" />
          </q-item-section>
        </q-item>
      </template>

      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">无本体模型可用</q-item-section>
        </q-item>
      </template>
    </q-select>

    <template #edit="props">
      <q-btn flat @click="startTask(props.item.id)" label="构建图谱" />
    </template>
  </Table>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue'
import { listTasks, listModels, getModelJson, deleteTask, createTask } from '../api'
import { useToast } from 'vue-toastification'
import type { CellData, GiTag, TaskMeta } from 'src/types'
import { listDataSources } from '../api'
import worker from '../lib/worker'
import { useConfigStore } from '../store'

const Table = defineAsyncComponent(() => import('@/components/Table.vue'))
const DataMapper = defineAsyncComponent(() => import('@/components/DataMapper.vue'))

const dataCollectionOptions = (await (await listDataSources()).json()).data
const configStore = useConfigStore()
const toast = useToast()
const options = (await (await listModels()).json()).data
const model = ref<{ id: number; name: string } | null>(null)
const dialog = ref(false)
const dialogLoading = ref(false)
const cells = ref<CellData[] | null>(null)
const newTaskDescription = ref('')
let task: TaskMeta | null = null

const getItems = async () => (await (await listTasks()).json()).data
const createItem = async (name: string) => {
  if (task === null) {
    toast.info('请选择本体模型')
    return
  }
  await createTask(name, newTaskDescription.value, task)
  task = null
  newTaskDescription.value = ''
}

const startTask = async (id: number) => {
  await worker.initTaskFactory({
    url: configStore.serverBaseUrl,
    db: {
      type: 'neo4j',
      config: {}
    }
  })
  await worker.startTask(id)
}

// 选择模型后下载模型数据
const selectedModel = async () => {
  dialog.value = true
  dialogLoading.value = true

  // 下载数据并预处理
  const mjson: CellData[] = (await (await getModelJson(model.value?.id.toString() as string)).json()).data.attributes.data.cells
    // 剔除空值
    .filter((cell: { data: object | undefined }) => cell.data !== undefined)
    .map((cell: { data: object, id: string, source?: { cell: string }, target?: { cell: string } }) => {
      // id
      cell.data["id"] = cell.id
      // 边的 source 处理  
      cell.source && (cell.data["from"] = {
        id: cell.source.cell,
        tag: cell.data["from"]
      })
      // 边的 target 处理  
      cell.target && (cell.data["to"] = {
        id: cell.target.cell,
        tag: cell.data["to"]
      })
      return cell
    })
    .map((cell: { data: CellData }) => cell.data)

  // 预处理 tag 的空值
  for (const cell of mjson) {
    cell.concept.attributes.tag = cell.concept.attributes.tag
      .filter((t: GiTag) => t.gi_tag.data !== null)
  }

  // 将实体放在前面进行处理
  mjson.sort((cell1, cell2) => {
    const a = cell1.from === undefined ? 0 : 1
    const b = cell2.from === undefined ? 0 : 1
    return a - b
  })

  cells.value = mjson
  dialogLoading.value = false
}

// 数据匹配结束
const done = (taskMeta: TaskMeta) => {
  task = taskMeta
  // 关闭 mapper
  dialog.value = false
  // 清除 cells
  cells.value = null
}

const columns = [
  {
    align: 'center',
    name: 'id',
    label: '任务流 ID',
    field: 'id',
  },
  {
    align: 'center',
    name: 'name',
    label: '任务流名称',
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
