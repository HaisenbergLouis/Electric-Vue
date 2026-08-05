<script lang='ts' setup>
import Navbar from '@/components/Navbar.vue';
import { ref,onMounted } from 'vue';
import GoodsCard from '@/components/GoodsCard.vue';
import { getGoodsList } from '@/api';
import type { GoodsItem } from '@/api';

const goodsList = ref<GoodsItem[]>([])

onMounted(async()=>{
  const res= await getGoodsList({page:1,pageSize:8});
  if(res.code === 0){
    goodsList.value = res.data.list
  }
})

const banners = [
  { id: 1, src: 'https://picsum.photos/seed/banner1/1240/400', title: '夏日狂欢 全场5折起' },
  { id: 2, src: 'https://picsum.photos/seed/banner2/1240/400', title: '新品上市 抢先体验' },
  { id: 3, src: 'https://picsum.photos/seed/banner3/1240/400', title: '数码狂欢 限时特惠' },
]

</script>
<template>
<Navbar/>
<div class="container">
  <el-carousel height="400px" class="banner">
    <el-carousel-item v-for="b in banners" :key="b.id">
      <img :src="b.src" class="banner-img" alt="b.title">
    </el-carousel-item>
  </el-carousel>
    
    <h2>推荐商品</h2>
    <div class="goods-list">
      <GoodsCard v-for="item in goodsList" :key="item.id" :item="item" show-sales />
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
    margin: 30px 0 20px;
    padding-left: 12px;
    border-left: 4px solid #e4393c;
    line-height: 1;
  }
}

.banner {
  border-radius: 8px;
  overflow: hidden;

  .banner-img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
}

.goods-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
</style>