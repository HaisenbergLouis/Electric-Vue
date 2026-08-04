<script lang='ts' setup>
import {ref,onMounted} from 'vue'
import Navbar from '@/components/Navbar.vue';
import { RouterLink } from 'vue-router';
import { getGoodsList } from '@/api';
import type{ GoodsItem } from '@/api';

// 商品列表数据（从数据访问层获取）
const goodsList= ref<GoodsItem[]>([]);
// 页面加载时获取商品列表
onMounted(async ()=>{
  const res = await getGoodsList()
  if(res.code === 0){
    goodsList.value = res.data.list
  }
})
</script>
<template>
    <Navbar />
  <div class="container">
    <h2>全部商品</h2>
    <!-- 循环渲染商品 -->
    <div class="goods-list"> 
      <RouterLink v-for="item in goodsList" :key="item.id" :to="`/goods/${item.id}`" class="goods-item">
        <el-image :src="item.pic" fit="cover" class="goods-img"/>
        <div class="goods-info">
          <p class="goods-name">{{ item.name }}</p>
          <p class="goods-desc">{{ item.desc }}</p>
          <div class="goods-bottom">
            <span class="price">
              <i>￥</i>{{ item.price }}
            </span>
            <span class="sales">已售{{ item.sales }}</span>
          </div>
        </div>
      </RouterLink>
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