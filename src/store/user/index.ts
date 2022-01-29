import { defineStore } from 'pinia'
import { UserStore, UserAuth, UserLoginResp } from './types'
import { userLogin } from '../../api'
import { useConfigStore } from '../config'
export const useUserStore = defineStore('user', {
  state: (): UserStore => ({
    logintime: undefined,
    jwt: '',
    user: {
      blocked: false,
      confirmed: false,
      createdAt: '',
      email: '',
      id: 0,
      provider: '',
      updatedAt: '',
      username: '',
    },
  }),
  actions: {
    // 登录
    async signin(userAuth: UserAuth) {
      const configStore = useConfigStore()
      const resp = await userLogin(userAuth)
      if (resp.status === 200) {
        const userLoginResp: UserLoginResp = await resp.json()
        this.logintime = Date.now()
        this.jwt = userLoginResp.jwt
        this.user = userLoginResp.user
        configStore.showBar = true
      }
      return resp
    },
    // 登出
    signout() {
      const configStore = useConfigStore()
      this.$reset()
      configStore.showBar = false
    },
  },
  debounce: {
    signin: 1000,
  },
  persist: true,
})

export * from './types'
