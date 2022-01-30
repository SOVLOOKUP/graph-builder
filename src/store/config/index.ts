import { defineStore } from 'pinia'
import { ConfigStore } from './types'

const AutoHideAppBarAtPath = ['/model/', '/auth']

export const useConfigStore = defineStore('config', {
  state: (): ConfigStore => ({
    serverBaseUrl:
      (import.meta.env.VITE_STRAPI_URL as string) ?? 'http://localhost:1337',
    mode: 'build',
    showBar: false,
  }),
  actions: {
    async autoHideBar(path: string) {
      if (AutoHideAppBarAtPath.some((p) => path.startsWith(p))) {
        this.showBar = false
      } else {
        this.showBar = true
      }
    },
  },
  persist: true,
})

export * from './types'
