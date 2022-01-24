<template>
  <q-dialog
    v-model="dialog"
    persistent
    transition-show="flip-down"
    transition-hide="flip-up"
  >
    <q-card>
      <q-bar class="bg-primary text-white">
        <span>新增{{ itemName }}</span>

        <q-space />
      </q-bar>

      <q-card-section class="q-pt-none q-pa-md">
        <q-input
          :label="`${itemName}名称`"
          type="text"
          v-model="newItemName"
          variant="outlined"
          hide-details="auto"
        />
        <slot />
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
      :rows="items"
      aligen="center"
      :rows-per-page-options="[15, 10, 5, 0]"
      separator="vertical"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top>
        <q-btn color="primary" :label="`新增${itemName}`" @click="addNewBtn">
          <Icon icon="mdi-plus" />
        </q-btn>
        <q-space />
        <q-input
          dense
          debounce="300"
          color="primary"
          v-model="filter"
          :placeholder="`搜索${itemName}名称`"
          @change="search"
        >
          <template v-slot:append>
            <Icon icon="mdi-search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn flat @click="removeItem(props.row.id)"> 删除 </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { notify } from '@kyvg/vue3-notification'

const props = withDefaults(
  defineProps<{
    itemName: string
    columns: any
    getItems: () => Promise<Item[]>
    deleteItem: (id: number) => Promise<any>
    createItem: (name: string) => Promise<any>
  }>(),
  {
    itemName: 'xx',
    columns: [],
  }
)

interface Item extends Object {
  id: number
  attributes: {
    name: string
  }
}

const filter = ref('')
const newItemName = ref('')
const loading = ref(true)
const dialog = ref(false)
const items = ref()
let cache: Item[] = []

const refresh = async () => {
  loading.value = true
  try {
    cache = await props.getItems()
  } catch (err) {
    notify({
      type: 'error',
      title: String(err),
    })
  }
  items.value = cache
  loading.value = false
}

const removeItem = async (id: number) => {
  await props.deleteItem(id)
  await refresh()
}

const addNewBtn = async () => {
  newItemName.value = ''
  dialog.value = true
}

const addTag = async () => {
  if (newItemName.value !== '') {
    await props.createItem(newItemName.value)
    await refresh()
  }
}

const search = async () => {
  loading.value = true
  items.value = cache.filter((item: any) => {
    return item.attributes.name.includes(filter.value)
  })
  loading.value = false
}

onBeforeMount(refresh)
</script>
