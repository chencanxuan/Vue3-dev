import { http } from '@/utils/http'
import type { BannerItem } from '@/types/home'

//封装获取轮播图数据的接口
export const getBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    url: '/home/banner',
    method: 'GET',
    data: {
      distributionSite,
    },
  })
}
