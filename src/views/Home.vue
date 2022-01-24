<template>
  <!-- <v-dialog v-model="dialog" persistent>
    <v-card style="transform: translate(0, -50px)">
      <v-card-title>
        <span>修改组织域名空间</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="组织域名"
                type="text"
                v-model="newBackendDomain"
                variant="outlined"
                hide-details="auto"
                @keydown="
                  (e: KeyboardEvent) => {
                    if (e.key === 'Enter') {
                      editBackendDomain()
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
        <v-btn color="primary" text @click="editBackendDomain"> 确认 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog> -->

  <Card :loading="loading">
    <q-list bordered>
      <q-item clickable v-ripple v-for="item in listItems">
        <q-item-section>{{ item.name }}</q-item-section>
        <q-item-section> {{ item.value }} </q-item-section>
      </q-item>
    </q-list>

    <q-card-actions align="right" class="q-pa-md">
      <q-btn
        flat
        @click="
          () => {
            store.commit('signout')
            $router.push('/auth/signin')
          }
        "
      >
        退出登录
      </q-btn>
    </q-card-actions>
  </Card>
</template>

<script lang="ts" setup>
import Card from '@/components/Card.vue'
import { useStore } from '../store'
import { ref } from 'vue'

// const dialog = ref(false)
const loading = ref(false)
const store = useStore()
const userInfo = store.state.user?.user

const listItems = [
  { name: '用户名', value: userInfo?.username },
  { name: '邮箱', value: userInfo?.email },
  { name: '图数据库地址', value: store.state.user?.dbUrl },
]

// const newBackendDomain = ref('')

// const editBackendDomain = () => {
//   dialog.value = false
//   if (newBackendDomain.value !== '')
//     store.commit('editBackendDomain', newBackendDomain.value)
// }
</script>
