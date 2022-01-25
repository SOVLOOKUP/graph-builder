import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { UserState } from './user'
import VuexPersistence from 'vuex-persist'
import type { Router } from 'vue-router'

interface State {
  user: UserState | null
  showBar: boolean
  serverBaseUrl: string
}

const AutoHideAppBarAtPath = ['/model/', '/auth']
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  plugins: [new VuexPersistence<State>().plugin],
  state: {
    user: null,
    showBar: false,
    serverBaseUrl: 'https://api.lingthink.com:4443',
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
    toggleBar(state, showBar: boolean) {
      state.showBar = showBar
    },
  },
  actions: {
    async autoHideBar(state, router: Router) {
      await router.isReady()
      if (
        AutoHideAppBarAtPath.some((p) =>
          router.currentRoute.value.fullPath.startsWith(p)
        )
      ) {
        state.commit('toggleBar', false)
      } else {
        state.commit('toggleBar', true)
      }
    },
  },
})

export function useStore() {
  return baseUseStore(key)
}
