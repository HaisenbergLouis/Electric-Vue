import type { UserInfo } from "../type";
// 数据库记录（含密码，仅模拟用）
export interface UserRecord {
  id: number;
  username: string;
  password: string;
  avatar: string;
  phone: string;
}

// 预置一个测试账号
export const usersDB: UserRecord[] = [
  {
    id: 1,
    username: "zhangsan",
    password: "123456",
    avatar: "",
    phone: "13800000000",
  },
];

// 转成对外返回的用户信息（去掉密码）
export function toUserInfo(user: UserRecord): UserInfo {
  return {
    id: user.id,
    username: user.username,
    avatar: user.avatar,
    phone: user.phone,
  };
}
