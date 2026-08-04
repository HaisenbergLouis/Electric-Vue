<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from './store/user';
const userStore = useUserStore()

// 页面加载时根据本地 token 恢复登录态
onMounted(()=>{
  userStore.fetchUserInfo()
})
</script>

<template>
  <RouterView/>
</template>
