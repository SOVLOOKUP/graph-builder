import ky from 'ky'
import { store } from '../store'

const API = () =>
  ky.create({
    mode: 'cors',
    // throwHttpErrors: false,
    prefixUrl: `${store.state.serverBaseUrl}/api/`,
  })

export default API
