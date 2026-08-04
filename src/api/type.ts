// 统一响应结构
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

// 用户模块
export interface UserInfo {
  id: number;
  username: string;
  avatar: string;
  phone: string;
}
export interface LoginResult {
  token: string;
  userInfo: UserInfo;
}

// ===== 商品模块 =====
export interface GoodsItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  pic: string;
  desc: string;
  detail: string;
  stock: number;
  sales: number;
}

export interface GoodsListResult {
  list: GoodsItem[];
  total: number;
  page: number;
  pageSize: number;
}
