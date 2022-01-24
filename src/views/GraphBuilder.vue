<template>
  <Table itemName="任务" :columns="columns" :getItems="getItems" />
</template>

<script lang="ts" setup>
import Table from '@/components/Table.vue'
import { listTasks } from '../api'

const getItems = async () => (await (await listTasks()).json()).data

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
