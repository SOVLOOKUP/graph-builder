<template>
  <div>
    <q-card-section class="q-pt-none">
      {{ tips }}
    </q-card-section>

    <q-form>
      <q-input
        v-model="identifier"
        :label="'邮箱/账户'"
        name="login"
        type="text"
        :error="error"
        @focus="resetForm"
      />
      <q-input
        v-model="password"
        :label="'密码'"
        name="password"
        type="password"
        :error="error"
        @focus="resetForm"
        @keydown="
          (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
              next()
            }
          }
        "
      />
    </q-form>
    <q-card-actions align="center">
      <q-btn flat @click="() => $router.push('signup')">创建帐号</q-btn>
    </q-card-actions>
    <q-card-actions align="right">
      <q-btn color="primary" @click="next"> 登录 </q-btn>
    </q-card-actions>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store'

const defaultTips = '输入您的帐号密码'
const identifier = ref('')
const password = ref('')
const error = ref(false)
const router = useRouter()
const tips = ref(defaultTips)
const userStore = useUserStore()

const emit = defineEmits<{
  (e: 'toggleLoading', to?: boolean): void
}>()

// 登录
const next = async () => {
  emit('toggleLoading', true)
  try {
    const res = await userStore.signin({
      identifier: identifier.value,
      password: password.value,
    })
    if (res.status === 200) {
      // 跳转到之前的页面或主页
      router.push(
        router.currentRoute.value.redirectedFrom === undefined
          ? '/'
          : router.currentRoute.value.redirectedFrom
      )
    } else {
      error.value = true
      tips.value = (await res.json())?.error?.message
    }
  } catch (e) {
    throw e
  } finally {
    // 关闭 loading
    emit('toggleLoading', false)
  }
}

const resetForm = () => {
  error.value = false
  tips.value = defaultTips
}
</script>
