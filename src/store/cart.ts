import { ref, computed } from "vue";
import { defineStore } from "pinia";
import {
  getCart,
  addCart,
  updateCartCount,
  updateCartChecked,
  removeCartItem,
  clearCart,
} from "@/api";
import type { CartItem } from "@/api";

export const useCartStore = defineStore("cart", () => {
  // ===== state：购物车条目 =====
  const items = ref<CartItem[]>([]);

  // ===== getter：总数量（Navbar 角标用）=====
  const totalCount = computed(() =>
    items.value.reduce((sum, i) => sum + i.count, 0),
  );

  // ===== getter：已勾选商品总价（结算用）=====
  const totalPrice = computed(() =>
    items.value
      .filter((i) => i.checked)
      .reduce((sum, i) => sum + i.price * i.count, 0),
  );

  // ===== getter：是否全选 =====
  const allChecked = computed(
    () => items.value.length > 0 && items.value.every((i) => i.checked),
  );

  // ===== action：拉取购物车 =====
  async function fetchCart() {
    const res = await getCart();
    if (res.code === 0) items.value = res.data.items;
  }

  async function addToCart(goodsId: string, count = 1) {
    const res = await addCart({ goodsId, count });
    if (res.code !== 0) throw new Error(res.message);
    await fetchCart(); // 重新拉取，保证数据同步
  }

  async function changeCount(id: string, count: number) {
    const res = await updateCartCount(id, count);
    if (res.code === 0) await fetchCart();
  }

  async function toggleChecked(id: string, checked: boolean) {
    const res = await updateCartChecked(id, checked);
    if (res.code === 0) await fetchCart();
  }

  async function removeItem(id: string) {
    const res = await removeCartItem(id);
    if (res.code === 0) await fetchCart();
  }

  async function clear() {
    const res = await clearCart();
    if (res.code === 0) await fetchCart();
  }

  return {
    items,
    totalCount,
    totalPrice,
    allChecked,
    fetchCart,
    addToCart,
    changeCount,
    toggleChecked,
    removeItem,
    clear,
  };
});
