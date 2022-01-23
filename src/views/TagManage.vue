<template>
  <v-dialog v-model="dialog" persistent>
    <v-card style="transform: translate(0, -100px)">
      <v-card-title>
        <span>新增标签</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="标签名称"
                type="text"
                v-model="newTagName"
                variant="outlined"
                hide-details="auto"
              />
            </v-col>
            <span>标签类型</span>
            <v-col cols="12">
              <v-radio-group v-model="newTagType">
                <v-radio
                  v-for="n in tagType"
                  :key="n"
                  :label="n"
                  :value="n"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false"> 取消 </v-btn>
        <v-btn color="primary" text @click="addTag"> 确认 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-container class="mt-6">
    <v-btn flat @click="addNewTag"> 新增标签<v-icon icon="mdi-plus" /> </v-btn>
    <v-table>
      <thead>
        <tr>
          <th class="text-center">
            <h2>标签名称</h2>
          </th>
          <th class="text-center">
            <h2>类型</h2>
          </th>
          <th class="text-center">
            <h2>操作</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in models" :key="item.id">
          <td class="text-center">
            <span>
              {{ item.attributes.name }}
            </span>
          </td>
          <td class="text-center">
            <span>
              {{ item.attributes.type }}
            </span>
          </td>
          <td class="text-center" width="300px">
            <v-container class="d-flex justify-space-around">
              <v-btn flat @click="removeTargetModel(item.id)">
                删除<v-icon icon="mdi-delete" />
              </v-btn>
            </v-container>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { listTags, deleteTag, createTag } from '../api'

const refresh = async () => {
  models.value = (await (await listTags()).json()).data as Tag
}

onBeforeMount(refresh)

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
  dialog.value = false
  if (newTagName.value !== '' && newTagType.value !== '') {
    // console.log(newTagName.value, newTagType.value)
    await createTag(newTagName.value, newTagType.value)
    await refresh()
  }
}
</script>
