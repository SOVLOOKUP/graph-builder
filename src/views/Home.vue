<template>
  <v-dialog v-model="dialog" persistent>
    <v-card style="transform: translate(0, -50px)">
      <v-card-title>
        <span>修改后端地址</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="后端URL"
                type="text"
                v-model="newBackendURL"
                variant="outlined"
                hide-details="auto"
                @keydown="
                  (e: KeyboardEvent) => {
                    if (e.key === 'Enter') {
                      editBackendURL()
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
        <v-btn color="primary" text @click="editBackendURL"> 确认 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

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
          <v-icon
            @click="
              () => {
                dialog = true
                newBackendURL = ''
              }
            "
            icon="mdi-circle-edit-outline "
          />
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

<script lang="ts" setup>
import Card from '@/components/Card.vue'
import { useStore } from '../store'
import { ref } from 'vue'

const dialog = ref(false)
const loading = ref(false)
const store = useStore()
const userInfo = store.state.user?.user
const newBackendURL = ref('')

const editBackendURL = () => {
  dialog.value = false
  if (newBackendURL.value !== '')
    store.commit('editBackendURL', newBackendURL.value)

  // todo 后端地址修改
}
</script>
