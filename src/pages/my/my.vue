<script setup lang="ts">
import { useMemberStore } from '@/stores/modules/member'
import { http } from '@/utils/http'

const memberStore = useMemberStore()

const getDate = async () => {
  const res = await http({
    method: 'GET',
    url: '/home/banner',
    header: {},
  })
  console.log(res)
}
</script>

<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: '黑马先锋',
          token: '1234567890',
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
  </view>
  <button type="primary" @tap="getDate" size="mini" plain>请求测试</button>
</template>

<style lang="scss">
//
</style>
