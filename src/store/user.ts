import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { login as loginApi, register as registerApi, getMe } from "@/api";
import type { UserInfo } from "@/api";

// localStorage 里存 token 的键名
const TOKEN_KEY = "mall_token";

export const useUserStore = defineStore("user", () => {
  // ===== state：刷新页面后从 localStorage 恢复 token =====
  const token = ref<string>(localStorage.getItem(TOKEN_KEY) || "");
  const userInfo = ref<UserInfo | null>(null);

  // ===== getter：是否已登录 =====
  const isLogin = computed(() => !!token.value);

  // ===== action：登录（成功才写状态 + 持久化）=====
  async function login(username: string, password: string) {
    const res = await loginApi({ username, password });
    if (res.code !== 0) throw new Error(res.message);
    token.value = res.data!.token;
    userInfo.value = res.data!.userInfo;
    localStorage.setItem(TOKEN_KEY, token.value);
  }

  // ===== action：注册 =====
  async function register(username: string, password: string) {
    const res = await registerApi({ username, password });
    if (res.code !== 0) throw new Error(res.message);
  }

  // ===== action：刷新页面后根据 token 恢复登录态 =====
  async function fetchUserInfo() {
    if (!token.value) return;
    const res = await getMe(token.value);
    if (res.code === 0) {
      userInfo.value = res.data;
    } else {
      logout();
    }
  }

  // ===== action：退出登录 =====
  function logout() {
    token.value = "";
    userInfo.value = null;
    localStorage.removeItem(TOKEN_KEY);
  }

  return { token, userInfo, isLogin, login, register, fetchUserInfo, logout };
});
