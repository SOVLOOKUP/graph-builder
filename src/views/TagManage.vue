<template>
  <!-- <v-dialog v-model="dialog" persistent>
    <v-card style="transform: translate(0, -150px)">
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
                  v-for="n in 7"
                  :key="n"
                  :label="`Radio ${n}`"
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
  </v-dialog> -->

  <v-container class="mt-6">
    <!-- <v-btn flat @click="addNewTag"> -->
    <v-btn flat @click="openCMS"> 管理标签<v-icon icon="mdi-flag" /> </v-btn>
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
          <td class="text-center" width="100px">
            <v-container class="d-flex justify-space-around">
              <!-- <v-btn flat @click="removeTargetModel(item.id)">
                删除<v-icon icon="mdi-delete" />
              </v-btn> -->
              <v-btn flat @click="openTagItem(item.id)">
                编辑<v-icon icon="mdi-open-in-app" />
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
import { listTags } from '../api'
import config from '../config'

onBeforeMount(async () => {
  models.value = (await (await listTags()).json()).data as Tag
})

interface Tag {
  id: number
  attributes: {
    type: string
    name: string
  }
}

// const newTagType = ref(1)
// const newTagName = ref('')
// const dialog = ref(false)
const models = ref()

// const removeTargetModel = async (id: number) =>
//   (models.value = models.value.filter((item) => item.id !== id))

// const addNewTag = async () => {
//   newTagName.value = ''
//   newTagType.value = 1
//   dialog.value = true
// }

// const addTag = async () => {
//   dialog.value = false
//   if (newTagName.value !== '')
//     models.value.push({
//       id: 333,
//       type: newTagType.value,
//       name: newTagName.value,
//     })
// }

const openCMS = async () => {
  window.open(
    `${config.serverBaseUrl}/admin/content-manager/collectionType/api::gi-tag.gi-tag`
  )
}

const openTagItem = async (id: number) => {
  window.open(
    `${config.serverBaseUrl}/admin/content-manager/collectionType/api::gi-tag.gi-tag/${id}`
  )
}
</script>
