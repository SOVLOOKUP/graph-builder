<template>
  <q-dialog persistent v-model="dialog">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>TODO 数据字段匹配</q-toolbar-title>
          <q-chip>4/54</q-chip>
          <q-btn flat round dense v-close-popup @click="model = null">
            <Icon icon="mdi:close" />
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>匹配内容</q-page>
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
      @update:model-value="dialog = true"
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
import { defineAsyncComponent, ref } from 'vue'
import { listTasks, listModels } from '../api'
import { useToast } from 'vue-toastification'
const Table = defineAsyncComponent(() => import('@/components/Table.vue'))

const toast = useToast()
const options = (await (await listModels()).json()).data
const model = ref(null)
// todo 匹配完自动关闭
const dialog = ref(false)

// todo 下载 gephi 格式
const getItems = async () => (await (await listTasks()).json()).data
const createItem = async () => {
  if (model.value === null) {
    toast.info("请选择本体模型")
    return
  }
  // todo 构建成图谱JSON
}

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
