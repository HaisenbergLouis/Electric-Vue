import type { ApiResponse, LoginResult, UserInfo } from "./type";
import { usersDB, toUserInfo } from "./mock/user";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// 登录
export async function login(data: {
  username: string;
  password: string;
}): Promise<ApiResponse<LoginResult | null>> {
  await delay();
  const user = usersDB.find(
    (u) => u.username === data.username && u.password === data.password,
  );
  if (!user) return { code: 2001, message: "用户名或密码错误", data: null };
  return {
    code: 0,
    message: "登录成功",
    data: { token: `mock-token-${user.id}`, userInfo: toUserInfo(user) },
  };
}

// 注册
export async function register(data: {
  username: string;
  password: string;
}): Promise<ApiResponse<UserInfo | null>> {
  await delay();
  if (usersDB.some((u) => u.username === data.username)) {
    return { code: 2002, message: "用户名已存在", data: null };
  }
  const newUser = {
    id: usersDB.length + 1,
    username: data.username,
    password: data.password,
    avatar: "",
    phone: "",
  };
  usersDB.push(newUser);
  return { code: 0, message: "注册成功", data: toUserInfo(newUser) };
}

// 根据 token 获取当前用户（模拟：token 末尾数字即用户 id）
export async function getMe(
  token: string,
): Promise<ApiResponse<UserInfo | null>> {
  await delay();
  const id = Number(token.replace("mock-token-", ""));
  const user = usersDB.find((u) => u.id === id);
  if (!user) return { code: 1002, message: "未登录或登录已过期", data: null };
  return { code: 0, message: "ok", data: toUserInfo(user) };
}
