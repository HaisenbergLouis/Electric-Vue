<script lang='ts' setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import Navbar from '@/components/Navbar.vue';
import { useCartStore } from '@/store/cart';

const router = useRouter();
const cartStore = useCartStore();

// 进入页面拉取购物车数据
onMounted(() => {
  cartStore.fetchCart();
});

// 修改数量
const handleCountChange = (id: string, count: number) => {
  if (count < 1) return;
  cartStore.changeCount(id, count);
};

// 单个勾选
const handleChecked = (id: string, checked: boolean) => {
  cartStore.toggleChecked(id, checked);
};

// 全选 / 取消全选
const handleCheckAll = (checked: boolean) => {
  cartStore.items.forEach((item) => {
    if (item.checked !== checked) {
      cartStore.toggleChecked(item.id, checked);
    }
  });
};

// 删除单个
const handleRemove = async (id: string) => {
  await cartStore.removeItem(id);
  ElMessage.success('已删除');
};

// 清空
const handleClear = async () => {
  await cartStore.clear();
  ElMessage.success('已清空');
};

// 去结算（第 5 步再做真实结算）
const handleCheckout = () => {
  ElMessage.info('结算功能开发中');
};
</script>

<template>
  <Navbar />
  <div class="container">
    <h2>我的购物车</h2>

    <!-- 空购物车 -->
    <div v-if="cartStore.items.length === 0" class="cart-empty">
      <el-empty description="购物车还是空的，快去逛逛吧">
        <el-button type="primary" color="#e4393c" @click="router.push('/goods')">去逛逛</el-button>
      </el-empty>
    </div>

    <!-- 有商品 -->
    <template v-else>
      <div class="cart-list">
        <!-- 表头 -->
        <div class="cart-header">
          <el-checkbox
            :model-value="cartStore.allChecked"
            @change="handleCheckAll"
          >全选</el-checkbox>
          <span class="col-goods">商品</span>
          <span class="col-price">单价</span>
          <span class="col-count">数量</span>
          <span class="col-total">小计</span>
          <span class="col-op">操作</span>
        </div>

        <!-- 商品行 -->
        <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
          <el-checkbox
            :model-value="item.checked"
            @change="(val:any) => handleChecked(item.id, val as boolean)"
          />
          <div class="col-goods goods-info">
            <el-image :src="item.pic" fit="cover" class="goods-img" />
            <span class="goods-name">{{ item.name }}</span>
          </div>
          <span class="col-price">¥{{ item.price }}</span>
          <div class="col-count">
            <el-input-number
              :model-value="item.count"
              :min="1"
              size="small"
              @change="(val:any) => handleCountChange(item.id, val as number)"
            />
          </div>
          <span class="col-total">¥{{ (item.price * item.count).toFixed(2) }}</span>
          <div class="col-op">
            <el-button link type="danger" @click="handleRemove(item.id)">删除</el-button>
          </div>
        </div>
      </div>

      <!-- 底部结算栏 -->
      <div class="cart-footer">
        <el-button link @click="handleClear">清空购物车</el-button>
        <div class="summary">
          <span>已选 <b>{{ cartStore.items.filter(i => i.checked).length }}</b> 件</span>
          <span class="total-label">合计：</span>
          <span class="total-price">¥{{ cartStore.totalPrice.toFixed(2) }}</span>
          <el-button type="primary" color="#e4393c" size="large" @click="handleCheckout">去结算</el-button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.container {
  width: 1240px;
  margin: 30px auto;
}
h2 {
  font-size: 22px;
  color: #333;
  margin: 0 0 20px;
  padding-left: 12px;
  border-left: 4px solid #e4393c;
  line-height: 1;
}
.cart-empty {
  padding: 80px 0;
  background: #fff;
  border-radius: 8px;
}
.cart-list {
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
}
.cart-header,
.cart-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
}
.cart-header {
  background: #f7f7f7;
  font-size: 14px;
  color: #666;
}
.cart-item {
  border-top: 1px solid #eee;
}
.col-goods {
  flex: 1;
}
.goods-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.goods-img {
  width: 60px;
  height: 60px;
  border-radius: 6px;
}
.goods-name {
  font-size: 15px;
  color: #333;
}
.col-price,
.col-total {
  width: 120px;
  color: #e4393c;
}
.col-count {
  width: 140px;
}
.col-op {
  width: 80px;
  text-align: right;
}
.cart-footer {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
}
.summary {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: #666;
}
.total-price {
  font-size: 24px;
  color: #e4393c;
  font-weight: 700;
}
</style>