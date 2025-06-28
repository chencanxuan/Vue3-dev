import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useMemberStore = defineStore(
  'member', // 唯一ID
  () => {
    // 会员信息  profile译为简介，概述
    const profile = ref<any>()

    // 保存会员信息，登录时使用
    const setProfile = (val: any) => {
      profile.value = val
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  //  持久化
  {
    // 这方式只适合网页端配置pinia持久化
    //persist: true,

    // 需调整为小程序端的pinia持久化配置  persist用于开始pinia持久化
    /*
    在 persist 配置中，storage 是一个对象，它用来定义：setItem(key, value)    getItem(key)
    定义存储数据的方法 setItem ，用于存储数据，key 是要存储数据的键，value 是值
    定义获取数据的方法 getItem ，key是要获取的数据
    uni.setStorageSync() 小程序中的同步API，用于同步把数据保存到本地缓存
    uni.getStorageSync() 小程序中的同步API，用于同步从本地缓存中获取指定 key 的内容，最后将这个数据暴露出去
    (这两都是原生小程序的api，都用于本地存储数据到手机中，可以实现“数据持久化”，即使关闭小程序，数据也还在)
     */
    persist: {
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        },
      },
    },
  },
)
