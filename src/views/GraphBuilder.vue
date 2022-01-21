<template>
  <v-container class="mt-6">
    <v-table>
      <thead>
        <tr>
          <th class="text-center">
            <h2>任务名称</h2>
          </th>
          <th class="text-center">
            <h2>状态</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tasks" :key="item.id">
          <td class="text-center">
            <span>
              {{ item.attributes.name }}
            </span>
          </td>
          <td class="text-center" width="300px">
            <v-container class="d-flex justify-space-around">
              {{ item.attributes.status }}
            </v-container>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { listTasks } from '../api'

onBeforeMount(async () => {
  tasks.value = (await (await listTasks()).json()).data
})

const tasks = ref()
</script>
