<template>
  <Card :loading="loading">
    <q-list bordered>
      <q-item clickable v-ripple v-for="item in listItems">
        <q-item-section>{{ item.name }}</q-item-section>
        <q-item-section>
          {{ item.value }}
          <q-popup-edit
            v-if="item.editable"
            v-model="item.value"
            v-slot="scope"
            @change="(e) => editItem(e, item.name)"
          >
            <q-input v-model="scope.value" dense autofocus counter />
          </q-popup-edit>
        </q-item-section>
      </q-item>
    </q-list>

    <q-card-actions align="right" class="q-pa-md">
      <q-btn flat @click="signout"> 退出登录 </q-btn>
    </q-card-actions>
  </Card>
</template>

<script lang="ts" setup>
import Card from '@/components/Card.vue'
import { useStore } from '../store'
import { onMounted, ref } from 'vue'
import { getDBAdress, updateDBAdress } from '../api'
import { useRouter } from 'vue-router'

const loading = ref(false)
const store = useStore()
const userInfo = store.state.user?.user
const router = useRouter()

// 动态config
const config = [
  {
    name: '邮箱',
    value: async () =>
      userInfo?.email + ' ' + (userInfo?.confirmed === true ? '✅' : '❔'),
    editable: false,
  },
  {
    name: '图数据库地址',
    value: async () =>
      (await (await getDBAdress()).json()).data.attributes.domain,
    editable: true,
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
  store.commit('signout')
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

onMounted(refreshConfig)

const editItem = async (p: Event, itemName: string) => {
  await updateDBAdress((p?.target as HTMLInputElement).value)
  await refreshConfig(itemName)
}
</script>
