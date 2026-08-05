<script lang='ts' setup>
import Navbar from '@/components/Navbar.vue';
import GoodsCard from '@/components/GoodsCard.vue';
import { ref,onMounted } from 'vue';
import { getNewGoods } from '@/api';
import type { GoodsItem } from '@/api';

const goodsList = ref<GoodsItem[]>([]);
onMounted(async()=>{
  const res = await getNewGoods();
  if(res.code === 0){
    goodsList.value = res.data.list;
  }

})
</script>
<template>
    <Navbar/>
<div class="container">
    <h2>新品上市</h2>
    <div class="goods-list">
      <GoodsCard :item="item" v-for="item in goodsList" :key="item.id" show-sales/>
    </div>
    
  </div>
</template>
<style scoped>
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
</style>