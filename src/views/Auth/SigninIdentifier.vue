<template>
  <div>
    <div class="text-center">
      <h2 class="headline mb-2">登录</h2>
      <span class="d-inline-block mb-8">使用你的 Starry 帐号</span>
    </div>

    <v-form @submit.prevent="next">
      <v-text-field
        ref="input"
        v-model="identifier"
        class="mb-2"
        :label="'邮箱/账户'"
        name="login"
        type="text"
        variant="outlined"
        hide-details="auto"
        :disabled="disabled"
        :error-messages="error"
      />
      <div class="d-flex justify-space-between">
        <v-btn flat> 创建帐号 </v-btn>
        <v-btn color="primary" @click="next"> 下一步 </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts" setup>
// import LoginCard from '@/components/LoginCard/LoginCard.vue'
import { ref } from 'vue'

const identifier = ref('')
const disabled = ref(false)
const error = ref(null)

const next = () => {
  if (!validEmail(identifier.value)) {
    console.log('Enter an valid email address')

    // this.$refs.input.focus()
    return
  }

  console.log('ok')

  // this.$emit('next', this.identifier)
  // this.$router.push({ name: 'password' })
}

const validEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
</script>
