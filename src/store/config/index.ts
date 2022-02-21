import { defineStore } from 'pinia'
import type { ConfigStore } from 'src/types'
import { workers } from '../../plugins/worker'
const AutoHideAppBarAtPath = ['/model/', '/auth']

export const useConfigStore = defineStore('config', {
  state: (): ConfigStore => ({
    // todo 设置之后调用 worker _init
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
    async setServerBaseUrl(url: string) {
      await workers._init(url)
      this.serverBaseUrl = url
    },
  },
  persist: true,
})
