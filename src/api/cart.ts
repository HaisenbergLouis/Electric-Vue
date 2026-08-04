import type { ApiResponse, CartResult } from "./type";
import { cartDB } from "./mock/cart";
import { goodsDB } from "./mock/goods";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// 根据购物车数据计算总数量与总价
function calcSummary() {
  const items = [...cartDB];
  return {
    items,
    totalCount: items.reduce((sum, item) => sum + item.count, 0),
    totalPrice: items
      .filter((item) => item.checked)
      .reduce((sum, item) => sum + item.price * item.count, 0),
  };
}

// 获取购物车
export async function getCart(): Promise<ApiResponse<CartResult>> {
  await delay();
  return { code: 0, message: "ok", data: calcSummary() };
}

// 加入购物车（同一商品重复加入则数量累加）
export async function addCart(data: {
  goodsId: string;
  count: number;
}): Promise<ApiResponse<null>> {
  await delay();
  const goods = goodsDB.find((g) => g.id === data.goodsId);
  if (!goods) return { code: 3001, message: "商品不存在", data: null };

  const exist = cartDB.find((item) => item.goodsId === data.goodsId);
  if (exist) {
    exist.count += data.count;
  } else {
    cartDB.push({
      id: `cart_${Date.now()}`,
      goodsId: goods.id,
      name: goods.name,
      pic: goods.pic,
      price: goods.price,
      count: data.count,
      checked: true,
    });
  }
  return { code: 0, message: "已加入购物车", data: null };
}

// 修改数量
export async function updateCartCount(
  cartItemId: string,
  count: number,
): Promise<ApiResponse<null>> {
  await delay();
  const item = cartDB.find((i) => i.id === cartItemId);
  if (!item) return { code: 4001, message: "购物车条目不存在", data: null };
  item.count = count;
  return { code: 0, message: "ok", data: null };
}

// 勾选 / 取消勾选
export async function updateCartChecked(
  cartItemId: string,
  checked: boolean,
): Promise<ApiResponse<null>> {
  await delay();
  const item = cartDB.find((i) => i.id === cartItemId);
  if (!item) return { code: 4001, message: "购物车条目不存在", data: null };
  item.checked = checked;
  return { code: 0, message: "ok", data: null };
}

// 删除单个条目
export async function removeCartItem(
  cartItemId: string,
): Promise<ApiResponse<null>> {
  await delay();
  const index = cartDB.findIndex((i) => i.id === cartItemId);
  if (index === -1)
    return { code: 4001, message: "购物车条目不存在", data: null };
  cartDB.splice(index, 1);
  return { code: 0, message: "ok", data: null };
}

// 清空购物车
export async function clearCart(): Promise<ApiResponse<null>> {
  await delay();
  cartDB.length = 0;
  return { code: 0, message: "ok", data: null };
}
