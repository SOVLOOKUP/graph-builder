import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => ({ identifier: '' }),
  getters: {
    double: (state) => state.identifier,
  },
  actions: {},
})
