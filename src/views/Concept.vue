<template>
  <v-dialog v-model="dialog" persistent>
    <v-card style="transform: translate(0, -50px)">
      <v-card-title>
        <span>新增概念</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="概念名称"
                type="text"
                v-model="newConceptName"
                variant="outlined"
                hide-details="auto"
                @keydown="
                  (e: KeyboardEvent) => {
                    if (e.key === 'Enter') {
                      addConcept()
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
        <v-btn color="primary" text @click="addConcept"> 确认 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-container class="mt-6">
    <v-btn flat @click="addNewConcept">
      新增概念<v-icon icon="mdi-plus" />
    </v-btn>
    <v-table>
      <thead>
        <tr>
          <th class="text-center">
            <h2>概念名称</h2>
          </th>

          <th class="text-center">
            <h2>操作</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in concepts" :key="item.id">
          <td class="text-center">
            <span>
              {{ item.attributes.name }}
            </span>
          </td>

          <td class="text-center" width="300px">
            <v-container class="d-flex justify-space-around">
              <v-btn flat @click="openConceptItem(item.id)">
                编辑<v-icon icon="mdi-open-in-app" />
              </v-btn>
              <v-btn flat @click="deleteConcept(item.id)">
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
import { listConcepts, removeConcepts, createConcept } from '../api'
import config from '../config'

const refresh = async () =>
  (concepts.value = (await (await listConcepts()).json()).data)

onBeforeMount(refresh)

const newConceptName = ref('')
const dialog = ref(false)
const concepts = ref()

const deleteConcept = async (id: number) => {
  await removeConcepts(id)
  await refresh()
}

const addNewConcept = async () => {
  newConceptName.value = ''
  dialog.value = true
}

const addConcept = async () => {
  dialog.value = false
  if (newConceptName.value !== '') {
    await createConcept(newConceptName.value, [])
    await refresh()
  }
}

const openConceptItem = async (id: number) => {
  window.open(
    `${config.serverBaseUrl}/admin/content-manager/collectionType/api::gi-concept.gi-concept/${id}`
  )
}
</script>
