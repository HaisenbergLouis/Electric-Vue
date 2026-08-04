<script lang='ts' setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/user';


const router = useRouter();
const userStore = useUserStore()

// 登录表单
const form = reactive({
  username: '',
  password: '',
});

// 登录
const handleLogin = async() => {
  if (!form.username || !form.password) {
    ElMessage.warning('请输入用户名和密码');
    return;
  }
  try{
    await userStore.login(form.username,form.password)
    ElMessage.success('登录成功');
    router.push('/');
  }catch(error){
    ElMessage.error((error as Error).message)
  }
  
};
</script>

<template>
<!-- <Navbar/> -->
<div class="auth-page">
  <div class="auth-box">
    <h2>用户登录</h2>
    <el-form :model="form" label-width="70px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名" clearable />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" color="#e4393c" style="width: 100%" @click="handleLogin">登 录</el-button>
      </el-form-item>
    </el-form>
    <div class="tip">
      还没有账号？<RouterLink to="/register">立即注册</RouterLink>
    </div>
  </div>
</div>
</template>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 0;
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
