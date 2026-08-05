<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { GoodsItem } from '@/api'

// 父组件通过 props 传入商品数据
// showSales：是否显示销量；showOriginalPrice：是否显示划线原价（特惠页用）
defineProps<{
  item: GoodsItem
  showSales?: boolean
  showOriginalPrice?: boolean
}>()
</script>

<template>
  <RouterLink :to="`/goods/${item.id}`" class="goods-card">
    <el-image :src="item.pic" fit="cover" class="goods-img" />
    <div class="goods-info">
      <p class="goods-name">{{ item.name }}</p>
      <p class="goods-desc">{{ item.desc }}</p>
      <div class="goods-bottom">
        <span class="price">
          <i>¥</i>{{ item.price }}
          <span v-if="showOriginalPrice" class="original-price">¥{{ item.originalPrice }}</span>
        </span>
        <span v-if="showSales" class="sales">已售{{ item.sales }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.goods-card {
  display: block;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s ease;

  .goods-img {
    width: 100%;
    height: 200px;
    display: block;
  }

  .goods-info {
    padding: 12px;
  }

  .goods-name {
    font-size: 15px;
    color: #333;
    margin: 0 0 6px;
    line-height: 1.4;
  }

  .goods-desc {
    font-size: 13px;
    color: #999;
    margin: 0 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .goods-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .price {
    color: #e4393c;
    font-size: 18px;
    font-weight: 600;

    i {
      font-style: normal;
      font-size: 12px;
    }
  }

  .original-price {
    margin-left: 8px;
    font-size: 12px;
    color: #999;
    text-decoration: line-through;
    font-weight: 400;
  }

  .sales {
    font-size: 12px;
    color: #999;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border-color: #e4393c;
  }
}
</style>