<template>
    <Table
        itemName="目标图数据库"
        :columns="columns"
        :getItems="getItems"
        :deleteItem="deleteGraphConfig"
        :createItem="createItem"
        @clearContent="newDBType = null;newConfig = null"
    >
        <q-select clearable v-model="newDBType" label="数据库类型" :options="AdapterTypes" />
        <div v-if="newDBType !== null">
        <!-- todo 根据schema生成表单 -->
        {{adapters[newDBType as string]['configSchema']}}
        </div>
    </Table>
</template>

<script lang="ts" setup>
import type { AdapterNames } from 'src/lib/adapter'
import { defineAsyncComponent, ref } from 'vue'
import { useToast } from 'vue-toastification'
import {
    createGraphConfig,
    deleteGraphConfig,
    listGraphConfigs
} from '../api'
import adapters, { AdapterTypes } from '../lib/adapter'
const Table = defineAsyncComponent(() => import('@/components/Table.vue'))
const toast = useToast()

const newDBType = ref<AdapterNames | null>(null)
const newConfig = ref<object | null>(null)

const getItems = async () => (await (await listGraphConfigs()).json()).data

const createItem = async (name: string) => {
    if (newDBType.value === null || newConfig.value === null) {
        toast.info("请选择数据库类型和配置")
        return
    }
    await createGraphConfig(name, newDBType.value, newConfig.value)
    newDBType.value = null
    newConfig.value = null
}

const columns = [
    {
        align: 'center',
        name: 'id',
        label: '目标 ID',
        field: 'id',
    },
    {
        align: 'center',
        name: 'name',
        label: '图数据库名称',
        field: (item: any) => item.attributes.name,
    },
    {
        align: 'center',
        name: 'name',
        label: '图数据库类型',
        field: (item: any) => item.attributes.type,
    },
    {
        align: 'center',
        name: 'action',
        label: '操作',
    },
]
</script>
