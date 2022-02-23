import API from '../base'
// import { useUserStore } from '../../store'

const AuthedAPI = () => {
  // const userStore = useUserStore()
  return API().extend({
    headers: {
      // Authorization: `Bearer ${userStore.jwt}`,
    },
  })
}

export default AuthedAPI

export * from './tag'
export * from './concept'
export * from './datasource'
export * from './model'
export * from './task'
