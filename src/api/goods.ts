import type {
  ApiResponse,
  GoodsItem,
  GoodsListResult,
  DiscountResult,
} from "./type";

import { goodsDB, newGoodsIds, discountGoodsDB } from "./mock/goods";
import type { G } from "vue-router/dist/router-CWoNjPRp.mjs";
// 模拟网络延迟
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// 商品列表（支持搜索+分页）
export async function getGoodsList(
  params: {
    keyword?: string;
    page?: number;
    pageSize?: number;
  } = {},
): Promise<ApiResponse<GoodsListResult>> {
  await delay();
  const { keyword = "", page = 1, pageSize = 10 } = params;
  let list = goodsDB;
  if (keyword) {
    list = goodsDB.filter((item) => item.name.includes(keyword));
  }
  const start = (page - 1) * pageSize;
  const pageList = list.slice(start, start + pageSize);
  return {
    code: 0,
    message: "ok",
    data: { list: pageList, total: list.length, page, pageSize },
  };
}

// 商品详情
export async function getGoodsDetail(
  id: string,
): Promise<ApiResponse<GoodsItem | null>> {
  await delay();
  const item = goodsDB.find((g) => g.id === id) ?? null;
  if (!item) return { code: 3001, message: "商品不存在", data: null };
  return { code: 0, message: "ok", data: item };
}

// 新品上市
export async function getNewGoods(): Promise<ApiResponse<GoodsListResult>> {
  await delay();
  const list = goodsDB.filter((g) => newGoodsIds.includes(g.id));
  return {
    code: 0,
    message: "ok",
    data: { list, total: list.length, page: 1, pageSize: list.length },
  };
}

// 限时特惠
export async function getDiscountGoods(): Promise<ApiResponse<DiscountResult>> {
  await delay();
  return { code: 0, message: "ok", data: { list: discountGoodsDB } };
}

// 搜索（供搜索页使用）
export async function searchGoods(
  keyword: string,
): Promise<ApiResponse<GoodsListResult>> {
  return getGoodsList({ keyword, page: 1, pageSize: 50 });
}
