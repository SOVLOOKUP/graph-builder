<template>
  <div>
    <div class="text-center">
      <h2 class="headline mb-2">注册成功 ✅</h2>
      <span class="d-inline-block mb-8">请前往您的邮箱查收验证邮件</span>
    </div>

    <div class="d-flex justify-center">
      <v-btn color="primary" @click="() => $router.push('signin')"
        >已激活? 立即前往登录</v-btn
      >
    </div>
  </div>
</template>
