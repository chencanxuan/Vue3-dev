/*
添加拦截器：
拦截 request 请求
拦截 uploadFile 文件上传
去做：
1,非 http 开头需拼接地址
2,请求超时
3,添加小程序请求头标识
4,添加 token 请求头标识
 */

import { useMemberStore } from '@/stores/modules/member'

//基础地址
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

//请求拦截器
const httpInterceptor = {
  //invoke是拦截器的钩子函数，options就是请求的配置对象，invoke标识在请求前做什么处理
  invoke(options: UniNamespace.RequestOptions) {
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    //超时时间
    options.timeout = 5000
    //console.log(options)
    //加上小程序请求头标识
    options.header = {
      'source-client': 'miniapp ',
      ...options.header,
    }
    //加上token 请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}

// 拦截 request 请求
uni.addInterceptor('request', httpInterceptor)
// 拦截 uploadFile 文件上传
uni.addInterceptor('uploadFile', httpInterceptor)

/**
 * 封装请求函数
 * @param  UniApp.RequestOptions
 * @returns Promise
 *  1. 返回 Promise 对象，用于处理返回值类型
 *  2. 获取数据成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 *  3. 获取数据失败
 *    3.1 401错误  -> 清理用户信息，跳转到登录页
 *    3.2 其他错误 -> 根据后端错误信息轻提示
 *    3.3 网络错误 -> 提示用户换网络
 */
type Data<T> = {
  code: string
  msg: string
  result: T
}
// 2.2 添加类型，支持泛型
// 封装请求函数 http
export const http = <T>(options: UniApp.RequestOptions) => {
  // 1. 返回 Promise 对象
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 响应成功
      success(res) {
        // 状态码 2xx，参考 axios 的设计
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据 res.data
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 401错误  -> 清理用户信息，跳转到登录页
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}
