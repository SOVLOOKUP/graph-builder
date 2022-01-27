import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { UserState } from './user'
import VuexPersistence from 'vuex-persist'
import type { Router } from 'vue-router'

type ModeType = 'build' | 'app'

interface State {
  user: UserState | null
  showBar: boolean
  serverBaseUrl: string
  mode: ModeType
}

const AutoHideAppBarAtPath = ['/model/', '/auth']
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  plugins: [new VuexPersistence<State>().plugin],
  state: {
    user: null,
    showBar: false,
    serverBaseUrl:
      process.env.SERVER_BASE_URL ?? 'https://api.lingthink.com:4443',
    mode: 'build',
  },
  mutations: {
    // 登录
    signin(state, userState: UserState) {
      state.user = userState
      state.showBar = true
    },
    // 登出
    signout(state) {
      state.user = null
      state.showBar = false
    },
    // 显示/隐藏应用栏
    toggleBar(state, showBar: boolean) {
      state.showBar = showBar
    },
    // 切换模式
    switchMode(state, mode: ModeType) {
      state.mode = mode
    },
    // 更新后端地址
    updateServerBaseUrl(state, url: string) {
      state.serverBaseUrl = url
    },
  },
  actions: {
    async autoHideBar(ctx, router: Router) {
      await router.isReady()
      if (
        AutoHideAppBarAtPath.some((p) =>
          router.currentRoute.value.fullPath.startsWith(p)
        )
      ) {
        ctx.commit('toggleBar', false)
      } else {
        ctx.commit('toggleBar', true)
      }
    },
  },
})

export function useStore() {
  return baseUseStore(key)
}
