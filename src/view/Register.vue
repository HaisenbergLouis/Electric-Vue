<script lang='ts' setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import Navbar from '@/components/Navbar.vue';

const router = useRouter();

// 注册表单
const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
});

// 注册
const handleRegister = () => {
  if (!form.username || !form.password || !form.confirmPassword) {
    ElMessage.warning('请填写完整信息');
    return;
  }
  if (form.password !== form.confirmPassword) {
    ElMessage.warning('两次输入的密码不一致');
    return;
  }
  // TODO: 对接真实注册接口
  ElMessage.success('注册成功，请登录');
  router.push('/login');
};
</script>

<template>
<!-- <Navbar/> -->
<div class="auth-page">
  <div class="auth-box">
    <h2>用户注册</h2>
    <el-form :model="form" label-width="70px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名" clearable />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="handleRegister">注 册</el-button>
      </el-form-item>
    </el-form>
    <div class="tip">
      已有账号？<RouterLink to="/login">去登录</RouterLink>
    </div>
  </div>
</div>
</template>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 70px);
  padding: 60px 0;
  background: #f5f5f5;
}
.auth-box {
  width: 380px;
  padding: 40px 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
.auth-box h2 {
  margin: 0 0 30px;
  text-align: center;
  color: #333;
}
.tip {
  margin-top: 16px;
  font-size: 14px;
  color: #999;
  text-align: center;
}
.tip a {
  color: #e4393c;
  text-decoration: none;
}
</style>
