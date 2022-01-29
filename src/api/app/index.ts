import API from '../base'
import { useUserStore } from '../../store'

// todo 处理 jwt 续期
// 记录时间戳 超过3天续期 超过7天重新登录
const AuthedAPI = () => {
  const userStore = useUserStore()
  return API().extend({
    headers: {
      Authorization: `Bearer ${userStore.jwt}`,
    },
  })
}

export default AuthedAPI

export * from './tag'
export * from './concept'
export * from './datasource'
export * from './model'
export * from './task'
export * from './dbaddress'
