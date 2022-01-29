import { defineStore } from 'pinia'
import { ConfigStore } from './types'
import { Router } from 'vue-router'

const AutoHideAppBarAtPath = ['/model/', '/auth']
console.log(import.meta.env)

export const useConfigStore = defineStore('config', {
  state: (): ConfigStore => ({
    serverBaseUrl:
      (import.meta.env.VITE_STRAPI_URL as string) ?? 'http://localhost:1337',
    mode: 'build',
    showBar: false,
  }),
  actions: {
    async autoHideBar(router: Router) {
      await router.isReady()
      if (
        AutoHideAppBarAtPath.some((p) =>
          router.currentRoute.value.fullPath.startsWith(p)
        )
      ) {
        this.showBar = false
      } else {
        this.showBar = true
      }
    },
  },
  persist: true,
})

export * from './types'
