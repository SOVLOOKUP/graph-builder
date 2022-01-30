import { useUserStore } from '../../store'
import { useToast } from 'vue-toastification'
import { RouteLocation, RouteLocationNormalized } from 'vue-router'
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
  if (!to.path.startsWith('/auth') && userStore.logintime === undefined) {
    return authURL
  } else {
    // jwt 超过 7 天重新登录
    if (
      (Date.now() - (userStore.logintime as number)) / 1000 / 60 / 60 / 24 >=
      7
    ) {
      toast.info('身份认证超期，请重新登录')
      return authURL
    }
    return true
  }
}

export { authGuard }
