<template>
  <q-dialog persistent full-height full-width v-model="dialog">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>数据字段匹配</q-toolbar-title>
          <q-chip v-show="cells !== null">{{ cells?.length }} 个集合需要匹配数据源</q-chip>
          <q-btn
            flat
            round
            dense
            @click="dialog = false;model = null;cells = null"
          >
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
          <DataMapper :cells="cells" :taskMeta="taskMeta" :dataCollectionOptions="dataCollectionOptions"/>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>

  <Table
    itemName="任务"
    :createItem="createItem"
    :columns="columns"
    :getItems="getItems"
    @clearContent="model = null"
  >
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
  </Table>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref, watch } from 'vue'
import { listTasks, listModels, getModelJson } from '../api'
import { useToast } from 'vue-toastification'
import type { CellData, TaskMeta, Category, DataMap } from 'src/types'
import { listDataSources } from '../api'
const Table = defineAsyncComponent(() => import('@/components/Table.vue'))
const DataMapper = defineAsyncComponent(() => import('@/components/DataMapper.vue'))

const dataCollectionOptions = (await (await listDataSources()).json()).data
const toast = useToast()
const options = (await (await listModels()).json()).data
const model = ref<{ id: number; name: string } | null>(null)
const dialog = ref(false)
const dialogLoading = ref(false)
const cells = ref<CellData[] | null>(null)

const taskMeta = ref<TaskMeta>({
  categories: new Map<string, Category>(),
  data: new Map<number, DataMap[]>(),
})

const getItems = async () => (await (await listTasks()).json()).data
const createItem = async () => {
  if (model.value === null) {
    toast.info('请选择本体模型')
    return
  }
  // todo 用 taskMeta 构建图谱
}

// 选择模型后下载模型数据
const selectedModel = async () => {
  dialog.value = true
  dialogLoading.value = true
  const mjson = await getModelJson(model.value?.id.toString() as string)
  cells.value = (await mjson.json()).data.attributes.data.cells
    .map((cell: { data: CellData | undefined }) => cell.data)
    .filter((i: CellData | undefined) => i !== undefined)
  dialogLoading.value = false
}

// cells 处理完毕自动关闭映射界面
watch([cells], () => {
  if (cells.value !== null && cells.value.length <= 0) {
    dialog.value = false
    cells.value = null
  }
})

const columns = [
  {
    align: 'center',
    name: 'id',
    label: '任务 ID',
    field: 'id',
  },
  {
    align: 'center',
    name: 'name',
    label: '任务名称',
    field: (item: any) => item.attributes.name,
  },
  {
    align: 'center',
    name: 'status',
    label: '状态',
    field: (item: any) => {
      switch (item.attributes.status) {
        case 'pending':
          return '等待中'
        case 'running':
          return '运行中'
        case 'success':
          return '成功'
        case 'failed':
          return '失败'
        default:
          return '未知'
      }
    },
  },
]
</script>
