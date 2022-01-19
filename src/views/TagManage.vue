<template>
  <v-dialog v-model="dialog" persistent>
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
  </v-dialog>

  <v-container class="mt-6">
    <v-btn flat @click="addNewTag">
      新增标签<v-icon icon="mdi-flag-plus" />
    </v-btn>
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
        <tr v-for="item in models" :key="item.name">
          <td class="text-center">
            <span>
              {{ item.name }}
            </span>
          </td>
          <td class="text-center">
            <span>
              {{ item.type }}
            </span>
          </td>
          <td class="text-center" width="100px">
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
import { ref } from 'vue'

const newTagType = ref(1)
const newTagName = ref('')
const dialog = ref(false)
// todo 与数据库接洽
const models = ref([
  {
    id: 1,
    name: 'Frozen Yogurt',
    type: 1,
  },
  {
    id: 2,
    name: 'Ice cream sandwich',
    type: 2,
  },
])

const removeTargetModel = async (id: number) =>
  (models.value = models.value.filter((item) => item.id !== id))

const addNewTag = async () => {
  newTagName.value = ''
  newTagType.value = 1
  dialog.value = true
}

const addTag = async () => {
  dialog.value = false
  if (newTagName.value !== '')
    models.value.push({
      id: 333,
      type: newTagType.value,
      name: newTagName.value,
    })
}
</script>
