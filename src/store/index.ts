import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { UserState } from './user'
import VuexPersistence from 'vuex-persist'
import { Router } from 'vue-router'
import config from '../config'

interface State {
  user: UserState | null
  showBar: boolean
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  plugins: [new VuexPersistence<State>().plugin],
  state: {
    user: null,
    showBar: false,
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
    editDbUrl(state, newDbUrl: string) {
      state.user && (state.user.dbUrl = newDbUrl)
    },
    toggleBar(state, showBar: boolean) {
      state.showBar = showBar
    },
  },
  actions: {
    async autoHideBar(state, router: Router) {
      await router.isReady()
      if (
        config.autoHideAppBarAtPath.some((p) =>
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
