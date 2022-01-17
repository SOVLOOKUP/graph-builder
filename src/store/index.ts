import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { UserAuth, UserState } from './user'
import { userLogin } from '../api'
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
  },
  actions: {},
})

export function useStore() {
  return baseUseStore(key)
}
