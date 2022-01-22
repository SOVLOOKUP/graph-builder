<template>
  <div>
    <div class="text-center">
      <h2 class="headline mb-2">登录</h2>
      <span class="d-inline-block mb-8">{{ tips }}</span>
    </div>

    <v-form>
      <v-text-field
        v-model="identifier"
        :label="'邮箱/账户'"
        name="login"
        type="text"
        variant="outlined"
        hide-details="auto"
        :error="error"
        @focus="resetForm"
      />
      <v-text-field
        v-model="password"
        :label="'密码'"
        name="password"
        type="password"
        variant="outlined"
        hide-details="auto"
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
      <div class="d-flex justify-space-between">
        <v-btn flat @click="() => $router.push('signup')">创建帐号</v-btn>
        <v-btn color="primary" @click="next"> 登录 </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../../store'
import { userLogin } from '../../api'
import config from '../../config'

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
        dbUrl: config.dbUrl,
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
