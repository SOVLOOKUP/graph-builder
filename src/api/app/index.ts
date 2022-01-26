import API from '../base'
import { store } from '../../store'

// todo 处理 jwt 续期
const AuthedAPI = () =>
  API().extend({
    headers: {
      Authorization: `Bearer ${store.state.user?.jwt}`,
    },
  })

export default AuthedAPI

export * from './tag'
export * from './concept'
export * from './datasource'
export * from './model'
export * from './task'
export * from './dbaddress'
