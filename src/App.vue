<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from './store/user';
import { useCartStore } from './store/cart';
const userStore = useUserStore()
const cartStore = useCartStore()

// 页面加载时根据本地 token 恢复登录态
onMounted(()=>{
  userStore.fetchUserInfo()
  cartStore.fetchCart()
  cartStore.fetchCart()// 新增：进入任意页面都同步购物车，角标才正确
})
</script>

<template>
  <RouterView/>
</template>
