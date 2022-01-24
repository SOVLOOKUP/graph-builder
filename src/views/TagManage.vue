<template>
  <q-dialog
    v-model="dialog"
    persistent
    transition-show="flip-down"
    transition-hide="flip-up"
  >
    <q-card>
      <q-bar class="bg-primary text-white">
        <span>新增标签</span>

        <q-space />
      </q-bar>

      <q-card-section class="q-pt-none q-pa-md">
        <q-input
          label="标签名称"
          type="text"
          v-model="newTagName"
          variant="outlined"
          hide-details="auto"
        />
        <q-select v-model="newTagType" :options="tagType" label="标签类型" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat v-close-popup> 取消 </q-btn>
        <q-btn color="primary" flat @click="addTag" v-close-popup> 确认 </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <div class="q-pa-md">
    <q-table
      :loading="loading"
      :rows="models"
      aligen="center"
      :rows-per-page-options="[15, 10, 5, 0]"
      separator="vertical"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top>
        <q-btn color="primary" label="新增标签" @click="addNewTag">
          <Icon icon="mdi-plus" />
        </q-btn>
        <q-space />
        <q-input
          dense
          debounce="300"
          color="primary"
          v-model="filter"
          placeholder="搜索标签名称"
          @change="search"
        >
          <template v-slot:append>
            <Icon icon="mdi-search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn flat @click="removeTargetModel(props.row.id)"> 删除 </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { listTags, deleteTag, createTag } from '../api'
import { Icon } from '@iconify/vue'
const columns = [
  {
    align: 'center',
    name: 'id',
    label: '标签ID',
    field: 'id',
  },
  {
    align: 'center',
    name: 'name',
    label: '标签名称',
    field: (item: any) => item.attributes.name,
  },
  {
    align: 'center',
    name: 'type',
    label: '类型',
    field: (item: any) => item.attributes.type,
  },
  {
    align: 'center',
    name: 'action',
    label: '操作',
  },
] as any

let data: Tag[]

const refresh = async () => {
  loading.value = true
  data = (await (await listTags()).json()).data
  models.value = data
  loading.value = false
}

onBeforeMount(refresh)

const filter = ref('')
const loading = ref(true)
const search = async () => {
  loading.value = true
  models.value = data.filter((item: any) => {
    return item.attributes.name.includes(filter.value)
  })
  loading.value = false
}

interface Tag {
  id: number
  attributes: {
    type: string
    name: string
  }
}

const tagType = ['string', 'number', 'bool', 'timestamp']
const newTagType = ref('')
const newTagName = ref('')
const dialog = ref(false)
const models = ref()

const removeTargetModel = async (id: number) => {
  await deleteTag(id)
  await refresh()
}

const addNewTag = async () => {
  newTagName.value = ''
  dialog.value = true
}

const addTag = async () => {
  if (newTagName.value !== '' && newTagType.value !== '') {
    // console.log(newTagName.value, newTagType.value)
    await createTag(newTagName.value, newTagType.value)
    await refresh()
  }
}
</script>
