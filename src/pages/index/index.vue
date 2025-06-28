<script setup lang="ts">
import navigationBar from './components/navigationBar.vue'
import { getBannerAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem } from '@/types/home'

// 轮播图列表
const swiperList = ref<BannerItem[]>([])

// 获取轮播图数据
const getBannerData = async () => {
  const res = await getBannerAPI()
  //console.log(res.result)
  swiperList.value = res.result
}
// onLoad是小程序页面加载时触发
onLoad(() => {
  getBannerData()
})
</script>

<template>
  <navigationBar></navigationBar>
  <XtxSwiper :list="swiperList"></XtxSwiper>
</template>

<style lang="scss"></style>
