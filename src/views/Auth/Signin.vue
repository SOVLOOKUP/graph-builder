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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../../store'
import { userLogin } from '../../api'

const defaultTips = '输入您的帐号密码'
const identifier = ref('')
const password = ref('')
const error = ref(false)
const router = useRouter()
const store = useStore()
const tips = ref(defaultTips)

const emit = defineEmits<{
  (e: 'toggleLoading'): void
}>()

// 登录
const next = async () => {
  emit('toggleLoading')
  try {
    const res = await userLogin({
      identifier: identifier.value,
      password: password.value,
    })

    if (res.status === 200) {
      store.commit('signin', {
        ...(await res.json()),
      })
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
    emit('toggleLoading')
  }
}

const resetForm = () => {
  error.value = false
  tips.value = defaultTips
}
</script>
