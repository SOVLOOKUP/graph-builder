<template>
  <Dialog
    v-model="dialog"
    :title="dialogContent?.title"
    :ok="dialogContent?.ok"
  >
    <q-input
      :label="`${itemName}名称`"
      type="text"
      v-model="newItemName"
      variant="outlined"
      hide-details="auto"
    />
    <slot name="default" />
  </Dialog>

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
        <q-btn
          color="primary"
          :label="`新增${itemName}`"
          v-if="createItem !== undefined"
          @click="
            openDialog({
              title: `新增${itemName}`,
              ok: async () => {
                if (newItemName !== '') {
                  createItem && (await createItem(newItemName))
                  await refresh()
                }
              },
            })
          "
        />
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
          <slot name="edit" :item="props.row" />
          <q-btn
            flat
            v-if="editItem !== undefined"
            @click="
              openDialog({
                title: `编辑${itemName}`,
                ok: async () => {
                  if (newItemName !== '') {
                    editItem && (await editItem(props.row.id, newItemName))
                    await refresh()
                  }
                },
              })
            "
          >
            编辑
          </q-btn>
          <q-btn
            flat
            v-if="deleteItem !== undefined"
            @click="removeItem(props.row.id)"
          >
            删除
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts" setup>
import Dialog from './Dialog.vue'
import { onBeforeMount, ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = withDefaults(
  defineProps<{
    itemName: string
    columns: any
    getItems: () => Promise<Item[]>
    createItem?: (name: string) => Promise<any>
    deleteItem?: (id: number) => Promise<any>
    editItem?: (id: number, name: string) => Promise<any>
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

const dialog = ref(false)
const filter = ref('')
const newItemName = ref('')
const loading = ref(true)
const items = ref()
const dialogContent = ref()
let cache: Item[] = []

const refresh = async () => {
  loading.value = true
  cache = await props.getItems()
  items.value = cache
  loading.value = false
}

const removeItem = async (id: number) => {
  props.deleteItem && (await props.deleteItem(id))
  await refresh()
}

const openDialog = (content: {
  title: string
  ok: (evt: any, navigateFn: () => void) => void
}) => {
  newItemName.value = ''
  dialogContent.value = content
  dialog.value = true
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
