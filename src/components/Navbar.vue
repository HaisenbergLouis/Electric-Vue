<template>
  <header class="nav-header">
    <div class="container">
      <!-- Logo -->
      <div class="logo">
        <RouterLink to="/">
          <h2>优品商城</h2>
        </RouterLink>
      </div>

      <!-- 主导航菜单 -->
      <nav class="main-nav">
        <RouterLink
          v-for="item in navList"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: route.path === item.path }"
        >
          {{ item.name }}
        </RouterLink>
      </nav>

      <!-- 搜索框 -->
      <div class="search-wrap">
        <el-input
          v-model="searchKey"
          placeholder="输入商品名称搜索"
          @keyup.enter="handleSearch"
        >
          <template #append>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </template>
        </el-input>
      </div>

      <!-- 右侧操作区 -->
      <div class="action-group">
        <!-- 购物车 -->
        <RouterLink to="/cart" class="cart-btn">
          <el-icon><ShoppingCart /></el-icon>
          <span>购物车</span>
          <el-badge :value="cartCount" class="badge" />
        </RouterLink>

        <!-- 已登录：下拉菜单 -->
        <div v-if="isLogin" class="user-dropdown">
          <el-dropdown trigger="click">
            <span class="user-text">
              <el-icon><User /></el-icon>
              {{ userInfo.username }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <RouterLink to="/member">个人中心</RouterLink>
                </el-dropdown-item>
                <el-dropdown-item>
                  <RouterLink to="/member/order">我的订单</RouterLink>
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <!-- 未登录 -->
        <div v-else class="login-group">
          <RouterLink to="/login" class="link">登录</RouterLink>
          <span>/</span>
          <RouterLink to="/register" class="link">注册</RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ShoppingCart, User } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

// 导航类型定义
interface NavItem {
  name: string
  path: string
}

// 用户信息类型
interface UserInfo {
  username: string
}

// 导航菜单
const navList = ref<NavItem[]>([
  { name: '首页', path: '/' },
  { name: '全部商品', path: '/goods' },
  { name: '新品上市', path: '/goods/new' },
  { name: '限时特惠', path: '/goods/discount' },
  { name: '关于我们', path: '/about' },
])

// 搜索关键词
const searchKey = ref<string>('')
// 购物车数量（后续迁移Pinia）
const cartCount = ref<number>(0)
// 登录状态
const isLogin = ref<boolean>(false)
// 用户信息
const userInfo = reactive<UserInfo>({
  username: ''
})

// 搜索
const handleSearch = () => {
  const keyword = searchKey.value.trim()
  if (!keyword) {
    ElMessage.warning('请输入搜索内容')
    return
  }
  router.push({ path: '/search', query: { keyword } })
}

// 退出登录
const handleLogout = () => {
  isLogin.value = false
  userInfo.username = ''
  ElMessage.success('退出成功')
  router.push('/')
}
</script>

<style scoped lang="scss">
.nav-header {
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 999;

  .container {
    width: 1240px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 30px;
  }

  .logo {
    flex-shrink: 0;
    a {
      text-decoration: none;
      color: #e4393c;
      h2 {
        margin: 0;
        font-size: 24px;
        font-weight: 600;
      }
    }
  }

  .main-nav {
    display: flex;
    .nav-item {
      height: 70px;
      line-height: 70px;
      padding: 0 16px;
      text-decoration: none;
      color: #333;
      font-size: 15px;
      transition: color 0.2s;

      &.active,
      &:hover {
        color: #e4393c;
      }
    }
  }

  .search-wrap {
    width: 340px;
    flex-shrink: 0;
  }

  .action-group {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-left: auto;

    .cart-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #333;
      text-decoration: none;
      &:hover {
        color: #e4393c;
      }
    }

    .user-text {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      color: #333;
      &:hover {
        color: #e4393c;
      }
    }

    .login-group {
      display: flex;
      align-items: center;
      gap: 8px;
      .link {
        color: #666;
        text-decoration: none;
        &:hover {
          color: #e4393c;
        }
      }
    }
  }
}
</style>