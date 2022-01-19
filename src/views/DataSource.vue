<template>
  <v-dialog v-model="dialog" persistent>
    <v-card style="transform: translate(0, -50px)">
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
                @keydown="
                  (e: KeyboardEvent) => {
                    if (e.key === 'Enter') {
                      addDataSource()
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
        <v-btn color="primary" text @click="addDataSource"> 确认 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-container class="mt-6">
    <v-btn flat @click="addNewDataSource">
      新增数据源<v-icon icon="mdi-database-plus" />
    </v-btn>
    <v-table>
      <thead>
        <tr>
          <th class="text-center">
            <h2>数据源名称</h2>
          </th>
          <th class="text-center">
            <h2>操作</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in dataSources" :key="item.name">
          <td class="text-center">
            <span>
              {{ item.name }}
            </span>
          </td>
          <td class="text-center" width="300px">
            <v-container class="d-flex justify-space-around">
              <v-btn flat @click="">
                编辑<v-icon icon="mdi-open-in-app" />
              </v-btn>
              <v-btn flat @click="removeTargetDataSource(item.id)">
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
import { ref } from 'vue'

const newDataSourceName = ref('')
const dialog = ref(false)
// todo 与数据库接洽
const dataSources = ref([
  {
    id: 1,
    name: 'Frozen Yogurt',
  },
  {
    id: 2,
    name: 'Ice cream sandwich',
  },
])

const removeTargetDataSource = async (id: number) =>
  (dataSources.value = dataSources.value.filter((item) => item.id !== id))

const addNewDataSource = async () => {
  newDataSourceName.value = ''
  dialog.value = true
}

const addDataSource = async () => {
  dialog.value = false
  if (newDataSourceName.value !== '')
    dataSources.value.push({ id: 333, name: newDataSourceName.value })
}
</script>
