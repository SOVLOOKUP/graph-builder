<template>
  <Card :loading="loading">
    <v-divider />
    <v-container class="mb-4">
      <v-row class="mt-2">
        <v-col><div class="text-subtitle-1">用户名</div></v-col>
        <v-col>
          <div>{{ userInfo?.username }}</div>
        </v-col>

        <v-divider class="mx-4"></v-divider>
      </v-row>

      <v-row class="mt-2">
        <v-col><div class="text-subtitle-1">邮箱</div></v-col>
        <v-col class="d-flex align-center">
          <v-row>
            <span>
              {{ userInfo?.email }}
            </span>
            <v-icon
              :icon="
                userInfo?.confirmed ? 'mdi-shield-check' : 'mdi-shield-alert'
              "
            />
          </v-row>
        </v-col>

        <v-divider class="mx-4"></v-divider>
      </v-row>

      <v-row class="mt-2">
        <v-col><div class="text-subtitle-1">后端地址</div></v-col>
        <v-col class="d-flex align-center">
          <v-row>
            {{ userInfo?.backendURL }}
          </v-row>
          <!-- <v-icon icon="mdi-circle-edit-outline " /> -->
        </v-col>
      </v-row>
    </v-container>
    <v-divider />
    <v-card-actions class="d-flex justify-end">
      <v-btn
        flat
        @click="
          () => {
            store.commit('signout')
            $router.push('/auth/signin')
          }
        "
      >
        退出登录
      </v-btn>
    </v-card-actions>
  </Card>
</template>

<!-- todo 退出登录、编辑后端地址 -->
<script lang="ts" setup>
import Card from '@/components/Card.vue'
import { useStore } from '../store'
import { ref } from 'vue'

const loading = ref(false)
const store = useStore()
const userInfo = store.state.user?.user
</script>
