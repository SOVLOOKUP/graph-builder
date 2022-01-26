<template>
  <div>
    <q-card-section class="q-pt-none">
      {{ tips }}
    </q-card-section>

    <q-form>
      <q-input
        v-model="email"
        :label="'邮箱'"
        name="login"
        type="text"
        :error="error"
        @focus="resetForm"
      />

      <q-input
        v-model="username"
        :label="'用户名'"
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
        class="mr-auto"
        @focus="resetForm"
        @keydown="
          (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
              next()
            }
          }
        "
      />
      <q-card-actions align="center">
        <q-btn flat @click="() => $router.push('signin')">返回登录</q-btn>
      </q-card-actions>
      <q-card-actions align="right">
        <q-btn color="primary" @click="next"> 注册 </q-btn>
      </q-card-actions>
    </q-form>
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
      // TODO 部署后魔法链接回来
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
