import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { UserState } from './user'
import VuexPersistence from 'vuex-persist'

interface State {
  user: UserState | null
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  plugins: [new VuexPersistence<State>().plugin],
  state: {
    user: null,
  },
  mutations: {
    // 登录
    signin(state, userState: UserState) {
      state.user = userState
    },
    // 登出
    signout(state) {
      state.user = null
    },
    editBackendDomain(state, newBackendDomain: string) {
      state.user && (state.user.backendDomain = newBackendDomain)
    },
  },
  actions: {},
})

export function useStore() {
  return baseUseStore(key)
}
