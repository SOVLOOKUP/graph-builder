import { useUserStore } from '../../store'
import { useToast } from 'vue-toastification'
import { RouteLocation, RouteLocationNormalized } from 'vue-router'
import { useConfigStore } from '../../store'

const toast = useToast()

const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  const userStore = useUserStore()
  const authURL: RouteLocation = {
    path: '/auth/signin',
    matched: [],
    fullPath: '',
    query: {},
    hash: '',
    name: undefined,
    params: {},
    redirectedFrom: from,
    meta: {},
  }
  // 如果未登录前往登录
  if (!to.path.startsWith('/auth') && userStore.logintime === undefined) {
    return authURL
  }

  // jwt 超过 7 天重新登录
  if (
    (!to.path.startsWith('/auth') && (Date.now() - (userStore.logintime as number)) >= 604800000)
  ) {
    toast.info('身份认证超期，请重新登录')
    return authURL
  }

  return true
}

// 自动隐藏/显示导航栏
const autoHideBarGuard = async (to: RouteLocationNormalized) => {
  await useConfigStore().autoHideBar(to.fullPath)
  return true
}

export { authGuard, autoHideBarGuard }
