<template>{{ userInfo }}</template>

<!-- todo 退出登录、编辑后端地址 -->
<script lang="ts" setup>
import { useStore } from '../store'
const store = useStore()
const userInfo = store.state.user?.user
</script>
