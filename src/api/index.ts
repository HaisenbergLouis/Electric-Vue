// 页面统一从这里引入
export * from "./type";

export {
  getGoodsList,
  getGoodsDetail,
  getNewGoods,
  getDiscountGoods,
  searchGoods,
} from "./goods";

export { login, register, getMe } from "./user";

export {
  getCart,
  addCart,
  updateCartCount,
  updateCartChecked,
  removeCartItem,
  clearCart,
} from "./cart";
