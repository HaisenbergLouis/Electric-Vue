<template>
  <div class="goods-detail container">
    <div class="detail-wrap">
      <!-- 左侧图片区域 -->
      <div class="goods-img">
        <el-image
          :src="goodsInfo.pic"
          fit="cover"
          style="width: 420px;height:420px"
        />
      </div>
      <!-- 右侧信息 -->
      <div class="goods-info">
        <h2 class="title">{{ goodsInfo.name }}</h2>
        <div class="price">
          <span class="symbol">¥</span>
          <span class="num">{{ goodsInfo.price }}</span>
        </div>
        <div class="desc">{{ goodsInfo.desc }}</div>

        <div class="num-select">
          <span>购买数量：</span>
          <el-input-number
            v-model="buyNum"
            :min="1"
            :max="goodsInfo.stock"
          />
        </div>

        <div class="btn-group">
          <el-button type="primary" @click="addCart">加入购物车</el-button>
          <el-button type="success">立即购买</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useCartStore } from '@/store/cart'
const cartStore = useCartStore()

const route = useRoute()
const router = useRouter()

// 商品详情 TS类型
interface GoodsItem {
  id: string
  name: string
  price: number
  pic: string
  desc: string
  stock: number
}

// 商品数据
// 注意：stock 初始给 1，不能是 0！
// 因为 el-input-number 的 min(1) > max(0) 会抛错导致页面渲染崩溃
const goodsInfo = ref<GoodsItem>({
  id: '',
  name: '',
  price: 0,
  pic: '',
  desc: '',
  stock: 1
})
// 购买数量
const buyNum = ref(1)

// 获取商品详情函数
const getGoodsDetail = async (id: string) => {
  console.log('请求商品id：', id)
  // ========== 这里后续替换成后端接口 ==========
  // 模拟接口数据
  goodsInfo.value = {
    id,
    name: '高性能无线蓝牙耳机 降噪长续航',
    price: 199,
    pic: 'https://img14.360buyimg.com/n1/jfs/t1/208243/20/25677/36789/647ad553F2d249370/8924479797424444.jpg',
    desc: "主动降噪，蓝牙5.3，续航30小时，高清通话",
    stock: 99
  }
}

// 加入购物车
const addCart = async() => {
    try{
        await cartStore.addToCart(goodsInfo.value.id,buyNum.value)
        ElMessage.success(`成功加入购物车 x${buyNum.value}`)
    }catch(error){
        ElMessage.error((error as Error).message)
    }
}

// 页面加载执行
onMounted(() => {
  // 拿到动态参数 id
  const goodsId = route.params.id as string
  if (!goodsId) {
    ElMessage.warning('商品不存在')
    router.push('/')
    return
  }
  getGoodsDetail(goodsId)
})

// ⚠️重点：路由跳转同一个商品不触发onMounted！监听id变化
watch(
  () => route.params.id,
  (newId) => {
    if (newId) getGoodsDetail(newId as string)
  }
)
</script>

<style scoped lang="scss">
.container {
  width: 1240px;
  margin: 30px auto;
}
.detail-wrap {
  display: flex;
  gap: 50px;
}
.goods-info {
  flex: 1;
  .title {
    font-size: 22px;
    color: #333;
    margin: 0 0 16px;
  }
  .price {
    color: #e4393c;
    font-size: 26px;
    .symbol {
      font-size: 18px;
    }
  }
  .desc {
    margin: 16px 0;
    color: #666;
  }
  .num-select {
    margin: 20px 0;
    display: flex;
    align-items: center;
    gap:12px;
  }
  .btn-group {
    margin-top:30px;
    button {
      width:140px;
      height:44px;
      font-size:16px;
      margin-right:16px;
    }
  }
}
</style>