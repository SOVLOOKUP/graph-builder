<template>
  <div>
    <q-card-section class="q-pt-none">
      <h5>注册成功 ✅</h5>
      <!-- <span>请前往您的邮箱查收验证邮件</span> -->
    </q-card-section>

    <q-btn flat color="primary" @click="() => $router.push('signin')">
      立即前往登录
    </q-btn>
  </div>
</template>
