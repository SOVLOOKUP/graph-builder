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
    updateUserState(state, userState: UserState) {
      state.user = userState
    },
    // 登出
    logout(state) {
      state.user = null
    },
  },
  actions: {
    // 登录
    async signin({ commit }, auth: UserAuth) {
      const res = await userLogin(auth)
      commit('updateUserState', res)
      return res
    },
  },
})

export function useStore() {
  return baseUseStore(key)
}
