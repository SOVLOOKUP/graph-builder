<template>
  <Card :loading="loading">
    <q-list bordered class="q-my-md">
      <q-item clickable v-ripple>
        <q-item-section>模式</q-item-section>
        <q-item-section>
          <span>
            <q-btn-toggle
              v-model="configStore.mode"
              toggle-color="primary"
              :options="[
                { label: '构建', value: 'build' },
                { label: '应用', value: 'app' },
              ]"
              @update:model-value="(e: ModeType) => (configStore.mode = e)"
            />
          </span>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple v-for="item in listItems">
        <q-item-section>{{ item.name }}</q-item-section>
        <q-item-section style="white-space: nowrap">
          {{ item.value }}
          <q-popup-edit
            v-if="item.editable"
            v-model="item.value"
            v-slot="scope"
            @change="(e:Event) => editItem(e, item.name)"
          >
            <q-input v-model="scope.value" dense autofocus counter />
          </q-popup-edit>
        </q-item-section>
      </q-item>
    </q-list>

    <q-card-actions align="right">
      <q-btn flat @click="signout"> 退出登录 </q-btn>
    </q-card-actions>
  </Card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore, useUserStore } from '../store'
import type { ModeType } from 'src/types'
import { defineAsyncComponent } from 'vue'
const Card = defineAsyncComponent(() => import('@/components/Card.vue'))

const loading = ref(false)
const configStore = useConfigStore()
const userStore = useUserStore()
const userInfo = userStore.user
const router = useRouter()

// 动态config
const config = [
  {
    name: '邮箱',
    value: async () =>
      userInfo?.email + ' ' + (userInfo?.confirmed === true ? '✅' : '❔'),
    editable: false,
  },
]

const listItems = ref([
  {
    name: '用户名',
    value: userInfo?.username,
    editable: false,
  },
])

const signout = async () => {
  userStore.signout()
  await router.push('/auth/signin')
}

// 更新配置项
const updateItem = async ({
  name,
  value,
  editable,
}: {
  name: string
  value: () => Promise<any> | any
  editable: boolean
}) => {
  const itemIndex = listItems.value.indexOf(
    listItems.value.filter((item: { name: string }) => item.name === name)[0]
  )

  let itemValue: any = value

  if (typeof value === 'function') {
    itemValue = await value()
  }

  if (itemIndex === -1) {
    listItems.value.push({
      name,
      value: itemValue,
      editable,
    })
  } else {
    listItems.value[itemIndex].value = itemValue
  }
}

// 根据名称指定更新或全部更新配置项
const refreshConfig = async (itemName?: string) => {
  loading.value = true
  if (itemName !== undefined) {
    const item = config.find((item) => item.name === itemName)
    if (item !== undefined) {
      await updateItem(item)
    }
  } else {
    for (const item of config) {
      await updateItem(item)
    }
  }
  loading.value = false
}

const editItem = async (p: Event, itemName: string) => {
  // await updateDBAddress((p?.target as HTMLInputElement).value)
  await refreshConfig(itemName)
}

await refreshConfig()
</script>
