<template>
  <div>
    <div class="text-center">
      <h2 class="headline mb-2">注册</h2>
      <span class="d-inline-block mb-8">{{ tips }}</span>
    </div>

    <v-form>
      <v-text-field
        v-model="email"
        :label="'邮箱'"
        name="login"
        type="text"
        :error="error"
        variant="outlined"
        hide-details="auto"
        @focus="resetForm"
      />

      <v-text-field
        v-model="username"
        :label="'用户名'"
        name="login"
        type="text"
        variant="outlined"
        :error="error"
        hide-details="auto"
        @focus="resetForm"
      />

      <v-text-field
        v-model="password"
        :label="'密码'"
        name="password"
        type="password"
        :error="error"
        class="mr-auto"
        variant="outlined"
        @focus="resetForm"
        hide-details="auto"
        @keydown="
          (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
              next()
            }
          }
        "
      />

      <div class="d-flex justify-space-between">
        <v-btn flat @click="() => $router.push('signin')">返回登录</v-btn>
        <v-btn color="primary" @click="next">注册</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { userRegister, sendEmailConfirmation } from '../../api'
import { useRouter } from 'vue-router'

const defaultTips = '注册一个属于您的帐户'
const username = ref('')
const email = ref('')
const password = ref('')
const error = ref(false)
const router = useRouter()
const tips = ref(defaultTips)

const emit = defineEmits<{
  (e: 'toggleLoading'): void
}>()

const next = async () => {
  emit('toggleLoading')
  try {
    // 注册账户
    const res = await userRegister({
      email: email.value,
      username: username.value,
      password: password.value,
    })

    if (res.status == 200) {
      // ok
      // 发送激活邮件
      await sendEmailConfirmation(email.value)
      // 跳转
      router.push('verify')
    } else {
      // not ok
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
