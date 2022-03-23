<template>
  <Table
    itemName="概念"
    :columns="columns"
    :getItems="getItems"
    :deleteItem="deleteConcept"
    :createItem="createItem"
    :editItem="updateItem"
    @fillContent="fillContent"
    @clearContent="conceptTags = []; newItemJsonldurl = undefined"
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
      :option-label="(opt) => opt?.attributes.name ?? '引用的标签已删除'"
    >
      <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
        <q-item v-bind="itemProps">
          <q-item-section>
            <q-item-label v-html="opt.attributes.name" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-html="opt.attributes.description" />
          </q-item-section>
          <q-item-section side>
            <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
          </q-item-section>
        </q-item>
      </template>

      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">无标签可用</q-item-section>
        </q-item>
      </template>
    </q-select>
  </Table>
</template>
>

<script lang="ts" setup>
import type { Tag, Concept } from 'src/types'
import { defineAsyncComponent } from 'vue'
import { ref } from 'vue'
import {
  listConcepts,
  deleteConcept,
  createConcept,
  listTags,
  updateConcept,
} from '../api'
const Table = defineAsyncComponent(() => import('@/components/Table.vue'))

let cache: Tag[] = []

const conceptTags = ref<Tag[]>([])
const options = ref<Tag[]>()
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

const fillContent = (e: Concept) => {
  newItemJsonldurl.value = e.attributes.jsonldurl
  conceptTags.value = e.attributes.tag.map((tag) => tag.gi_tag.data).filter(i => i !== null) as Tag[]
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
    field: (item: Concept) => item.attributes.tag.map(t => t.gi_tag.data?.attributes.name).filter(i => i !== undefined).join(', ')
  },
  {
    align: 'center',
    name: 'action',
    label: '操作',
  },
]

cache = (await (await listTags()).json()).data
options.value = cache
</script>
