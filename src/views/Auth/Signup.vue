<template>
  <div>
    <div class="text-center">
      <h2 class="headline mb-2">注册</h2>
      <span class="d-inline-block mb-8">注册一个 Starry 帐户</span>
    </div>

    <v-form>
      <v-text-field
        v-model="identifier"
        :label="'邮箱'"
        name="login"
        type="text"
        variant="outlined"
        hide-details="auto"
        :error-messages="error"
      />

      <div class="d-flex justify-space-between">
        <v-text-field
          v-model="password"
          :label="'验证码'"
          name="password"
          type="password"
          class="mr-auto"
          variant="outlined"
          hide-details="auto"
          :error-messages="error"
        />

        <div class="ml-4">
          <v-btn flat class="pa-7"> 发送验证码 </v-btn>
        </div>
      </div>

      <div class="d-flex justify-space-between">
        <v-btn flat @click="() => $router.push('signin')">返回登录</v-btn>
        <v-btn color="primary" @click="next"> 注册 </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const identifier = ref('')
const password = ref('')
const error = ref(null)

const emit = defineEmits<{
  (e: 'toggleLoading'): void
}>()

const next = () => {
  // 注册
  emit('toggleLoading')

  console.log(identifier.value, password.value)

  setTimeout(() => {
    // 注册账户

    // 关闭 loading
    emit('toggleLoading')
    // 跳转
  }, 1000)
}
</script>
