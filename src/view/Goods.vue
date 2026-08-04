<script lang='ts' setup>
import Navbar from '@/components/Navbar.vue';
import { RouterLink } from 'vue-router';

// 商品类型定义
interface GoodsItem {
  id: string
  name: string
}

// 模拟商品列表，后续替换接口数据
const goodsList: GoodsItem[] = [
  { id: '1001', name: '无线蓝牙耳机' },
  { id: '1002', name: '机械键盘' },
  { id: '1003', name: '电竞鼠标' }
]

</script>
<template>
    <Navbar />
  <div class="container">
    <h2>全部商品</h2>
    <!-- 循环渲染商品 -->
    <div class="goods-list">
      <div v-for="item in goodsList" :key="item.id" class="goods-item">
        <!-- 正确 :to 模板字符串 -->
        <RouterLink :to="`/goods/${item.id}`">
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  width: 1240px;
  margin: 30px auto;

  h2 {
    font-size: 22px;
    color: #333;
    margin: 0 0 20px;
    padding-left: 12px;
    border-left: 4px solid #e4393c;
    line-height: 1;
  }
}

.goods-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.goods-item {
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
  transition: all 0.3s ease;

  a {
    display: block;
    padding: 30px 20px;
    text-align: center;
    text-decoration: none;

    // 商品名称
    font-size: 16px;
    color: #333;
    line-height: 1.4;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border-color: #e4393c;

    a {
      color: #e4393c;
    }
  }
}
</style>