<template>
  <Table
    itemName="概念"
    :columns="columns"
    :getItems="getItems"
    :deleteItem="deleteConcept"
    :createItem="createItem"
    :editItem="updateItem"
    @fillContent="fillContent"
    @clearContent="
      () => {
        conceptTags = []
        newItemJsonldurl = undefined
      }
    "
  >
    <q-input
      label="JSON-LD引用"
      type="text"
      v-model="newItemJsonldurl"
      variant="outlined"
      hide-details="auto"
    />
    <q-select
      v-model="conceptTags"
      label="概念属性标签"
      hint="键入以筛选标签"
      multiple
      use-input
      use-chips
      stack-label
      @input-value="fillter"
      :options="options"
      :option-label="(opt) => opt.attributes.name"
      :loading="loading"
    >
      <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
        <q-item v-bind="itemProps">
          <q-item-section>
            <q-item-label v-html="opt.attributes.name" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-html="opt.attributes.type" />
          </q-item-section>
          <q-item-section side>
            <q-toggle
              :model-value="selected"
              @update:model-value="toggleOption(opt)"
            />
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
import {
  listConcepts,
  deleteConcept,
  createConcept,
  listTags,
  updateConcept,
} from '../api'
let cache: Tag[] = []

interface TagID {
  id: number
  tagid: number
}

interface Tag {
  id: number
  attributes: {
    name: string
    type: string
  }
}

interface Concept {
  id: number
  attributes: {
    name: string
    jsonldurl: string
    tag: TagID[]
  }
}

onMounted(async () => {
  cache = (await (await listTags()).json()).data
  options.value = cache
  loading.value = false
})

const conceptTags = ref<Tag[]>([])
const options = ref<Tag[]>()
const loading = ref(true)
const newItemJsonldurl = ref<undefined | string>(undefined)
const createItem = async (name: string) => {
  await createConcept(
    name,
    conceptTags.value.map((tag) => tag.id),
    newItemJsonldurl.value
  )
  conceptTags.value = []
}
const getItems = async () => (await (await listConcepts()).json()).data
const updateItem = async (id: number, name: string) =>
  updateConcept(
    id,
    name,
    conceptTags.value.map((tag) => tag.id),
    newItemJsonldurl.value
  )

// 根据 ID 从概念标签中提取标签信息
const fillContent = (e: Concept) => {
  // todo 查看为什么没有赋值
  newItemJsonldurl.value = e.attributes.jsonldurl
  return (conceptTags.value = e.attributes.tag.map((i: TagID) =>
    cache.find((tag: Tag) => tag.id === i.tagid)
  ) as Tag[])
}

// 筛选
const fillter = (v: string) =>
  (options.value = cache.filter((tag: Tag) => tag.attributes.name.includes(v)))

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
    field: (item: Concept) => item.attributes.name,
  },
  {
    align: 'center',
    name: 'tags',
    label: '概念属性',
    field: async (item: Concept) =>
      JSON.stringify(fillContent(item).map((i) => i?.attributes.name)),
  },
  {
    align: 'center',
    name: 'action',
    label: '操作',
  },
]
</script>
