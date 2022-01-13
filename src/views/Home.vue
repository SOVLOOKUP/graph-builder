<template>{{ userInfo }}</template>

<script lang="ts" setup>
import { useStore } from '../store'
const store = useStore()
const userInfo = store.state.user?.user
</script>
