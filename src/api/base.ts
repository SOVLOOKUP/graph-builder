import ky from 'ky'
import { store } from '../store'

// todo 处理 jwt 续期

const defaultKy = ky.create({
  mode: 'cors',
  throwHttpErrors: false,
})

export default defaultKy

export const AuthedKy = defaultKy.extend({
  headers: {
    Authorization: `Bearer ${store.state.user?.jwt}`,
  },
})
