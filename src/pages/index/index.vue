<script setup lang="ts">
import navigationBar from './components/navigationBar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import { getBannerAPI, getCategoryAPI, getHotAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'

// 轮播图列表
const swiperList = ref<BannerItem[]>([])
// 前台分类列表
const categoryList = ref<CategoryItem[]>([])
// 热门推荐列表
const hotList = ref<HotItem[]>([])

// 获取轮播图数据
const getBannerData = async () => {
  const res = await getBannerAPI()
  //console.log(res.result)
  swiperList.value = res.result
}
// 获取前台分类数据
const getCategoryData = async () => {
  const res = await getCategoryAPI()
  //console.log(res)
  categoryList.value = res.result
}
// 获取热门推荐数据
const getHotData = async () => {
  const res = await getHotAPI()
  //console.log(res.result)
  hotList.value = res.result
}
// onLoad是小程序页面加载时触发
onLoad(() => {
  getBannerData()
  getCategoryData()
  getHotData()
})
</script>

<template>
  <!-- 顶部导航 -->
  <navigationBar></navigationBar>
  <!-- 滚动区域 -->
  <scroll-view scroll-y refresher-enabled>
    <!-- 轮播图 -->
    <XtxSwiper :list="swiperList"></XtxSwiper>
    <!-- 前台分类 -->
    <CategoryPanel :list="categoryList"></CategoryPanel>
    <!-- 热门推荐 -->
    <HotPanel :list="hotList"></HotPanel>
    <!-- 猜你喜欢 -->
    <XtxGuess></XtxGuess>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
}
</style>
