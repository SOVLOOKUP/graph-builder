<template>
  <v-container class="mt-6">
    <v-table>
      <thead>
        <tr>
          <th class="text-center">
            <h2>构建任务</h2>
          </th>
          <th class="text-center">
            <h2>状态</h2>
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
          <td class="text-center" width="300px">
            <v-container class="d-flex justify-space-around">
              构建中
            </v-container>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// todo 与数据库接洽
const models = ref([
  {
    id: 1,
    name: 'Frozen Yogurt',
  },
  {
    id: 2,
    name: 'Ice cream sandwich',
  },
])
</script>
