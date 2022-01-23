<template>
  <v-dialog v-model="dialog" persistent>
    <v-card style="transform: translate(0, -50px)">
      <v-card-title>
        <span>新增模型</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="模型名称"
                type="text"
                v-model="newModelName"
                variant="outlined"
                hide-details="auto"
                @keydown="
                  (e: KeyboardEvent) => {
                    if (e.key === 'Enter') {
                      addModel()
                    }
                  }
                "
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false"> 取消 </v-btn>
        <v-btn color="primary" text @click="addModel"> 确认 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-container class="mt-6">
    <v-btn flat @click="addNewModel">
      新增模型<v-icon icon="mdi-plus" />
    </v-btn>
    <v-table>
      <thead>
        <tr>
          <th class="text-center">
            <h2>模型</h2>
          </th>
          <th class="text-center">
            <h2>操作</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in models" :key="item.id">
          <td class="text-center">
            <span> {{ item.attributes.name }} </span>
          </td>
          <td class="text-center" width="300px">
            <v-container class="d-flex justify-space-around">
              <v-btn flat @click="() => openModelBuilder(item.id.toString())">
                编辑<v-icon icon="mdi-open-in-app" />
              </v-btn>
              <v-btn flat @click="removeTargetModel(item.id)">
                删除<v-icon icon="mdi-delete" />
              </v-btn>
            </v-container>
            <!-- <v-btn flat> 打开<v-icon icon="mdi-layers-plus" /> </v-btn> -->
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { listModels, deleteModel, createModel } from '../api'
import { useRouter } from 'vue-router'
const refreshCache = async () =>
  (models.value = (await (await listModels()).json()).data)

onBeforeMount(refreshCache)

const router = useRouter()
const newModelName = ref('')
const dialog = ref(false)
const models = ref()

const removeTargetModel = async (id: number) => {
  await deleteModel(id)
  await refreshCache()
}

const addNewModel = async () => {
  newModelName.value = ''
  dialog.value = true
}

const addModel = async () => {
  createModel(newModelName.value)
  dialog.value = false
  await refreshCache()
}

const openModelBuilder = (id: string) => {
  window.open(router.resolve(`/model/${id}`).href)
}
</script>
