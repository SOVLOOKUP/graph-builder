<template>
  <v-dialog v-model="dialog" persistent>
    <v-card style="transform: translate(0, -100px)">
      <v-card-title>
        <span>新增数据源</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="数据源名称"
                type="text"
                v-model="newDataSourceName"
                variant="outlined"
                hide-details="auto"
              />
            </v-col>
            <span>数据类型</span>
            <v-col cols="12">
              <v-radio-group v-model="newDSType">
                <v-radio
                  v-for="n in DSType"
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
        <v-btn color="primary" text @click="addDataSource"> 确认 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-container class="mt-6">
    <v-btn flat @click="addNewDataSource">
      添加数据源<v-icon icon="mdi-plus" />
    </v-btn>
    <v-table>
      <thead>
        <tr>
          <th class="text-center">
            <h2>数据源名称</h2>
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
        <tr v-for="item in dataSources" :key="item.id">
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
              <v-btn flat @click="openDataSourceItem(item.id)">
                编辑<v-icon icon="mdi-open-in-app" />
              </v-btn>
              <v-btn flat @click="deleteDS(item.id)">
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
import { listDataSources, deleteDataSource, createDataSource } from '../api'
import config from '../config'

const refresh = async () => {
  dataSources.value = (await (await listDataSources()).json()).data
}
onBeforeMount(refresh)

const DSType = ['raw', 'nodes', 'edges']
const newDataSourceName = ref('')
const newDSType = ref('')
const dialog = ref(false)
const dataSources = ref()

const addNewDataSource = async () => {
  newDataSourceName.value = ''
  dialog.value = true
}

const addDataSource = async () => {
  dialog.value = false
  if (newDataSourceName.value !== '' && newDSType.value !== '') {
    await createDataSource(newDataSourceName.value, newDSType.value)
    await refresh()
  }
}

const deleteDS = async (id: number) => {
  await deleteDataSource(id)
  await refresh()
}

const openDataSourceItem = async (id: number) => {
  window.open(
    `${config.serverBaseUrl}/admin/content-manager/collectionType/api::gi-data-source.gi-data-source/${id}`
  )
}
</script>
